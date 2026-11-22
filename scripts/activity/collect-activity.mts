/**
 * Counts my commits per day over the last 12 months across every local repo,
 * split into day job / freelance / own work, and writes src/content/activity.json.
 *
 *   node --experimental-strip-types scripts/activity/collect-activity.mts
 *
 * Only counts and dates leave the repos: no repo names, messages or code.
 * Commits are deduplicated by hash, so clones and worktrees count once.
 */
import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const roots: { dir: string; category: Category }[] = [
  { dir: 'C:/Me/CWN', category: 'work' },
  { dir: 'C:/Me/FreelanceCoding', category: 'freelance' },
  { dir: 'C:/Me/PersonalCoding', category: 'own' }
]
// Client work that happens to live under PersonalCoding.
const overrides: Record<string, Category> = { 'scanhub-local-cmu': 'freelance' }
const myEmails = new Set([
  'mastersatang+github@gmail.com',
  'satang.b@chanwanich.digital',
  'hello@maf.co.th',
  'satangbudsai@users.noreply.github.com',
  '123102920+satangbudsai@users.noreply.github.com'
])
// Test fixtures that commit with my email but aren't me.
const ignoredNames = new Set(['e2e person'])

type Category = 'work' | 'freelance' | 'own'

const today = new Date()
const until = today.toISOString().slice(0, 10)
const sinceDate = new Date(today)
sinceDate.setUTCDate(sinceDate.getUTCDate() - 364)
const since = sinceDate.toISOString().slice(0, 10)

function findRepos(dir: string, depth = 0): string[] {
  if (depth > 5) return []
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  if (entries.includes('.git')) return [dir]
  return entries
    .filter(name => name !== 'node_modules' && !name.startsWith('.'))
    .map(name => path.join(dir, name))
    .filter(full => {
      try {
        return statSync(full).isDirectory()
      } catch {
        return false
      }
    })
    .flatMap(full => findRepos(full, depth + 1))
}

const seen = new Map<string, { date: string; category: Category }>()
const repos = new Set<string>()

for (const root of roots) {
  for (const repo of findRepos(root.dir)) {
    const top = path.relative(root.dir, repo).split(path.sep)[0]
    const category = overrides[top] ?? root.category
    let log = ''
    try {
      log = execFileSync(
        'git',
        [
          '-C',
          repo,
          'log',
          '--all',
          `--since=${since}`,
          `--until=${until} 23:59`,
          '--format=%H|%ae|%an|%ad',
          '--date=short'
        ],
        {
          encoding: 'utf8',
          maxBuffer: 64 * 1024 * 1024
        }
      )
    } catch {
      continue
    }
    for (const line of log.split('\n')) {
      const [hash, email, name, date] = line.split('|')
      if (!hash || !date || !myEmails.has(email.toLowerCase()) || ignoredNames.has(name.toLowerCase())) continue
      if (seen.has(hash)) continue
      seen.set(hash, { date, category })
      repos.add(repo)
    }
  }
}

const days: Record<string, Partial<Record<Category, number>>> = {}
for (const { date, category } of seen.values()) {
  days[date] ??= {}
  days[date][category] = (days[date][category] ?? 0) + 1
}

const output = {
  generated: until,
  since,
  until,
  repos: repos.size,
  days: Object.fromEntries(Object.entries(days).sort(([a], [b]) => a.localeCompare(b)))
}
writeFileSync(path.join(process.cwd(), 'src', 'content', 'activity.json'), JSON.stringify(output, null, 1) + '\n')
console.log(`${seen.size} commits on ${Object.keys(days).length} days in ${repos.size} repos (${since} → ${until})`)
