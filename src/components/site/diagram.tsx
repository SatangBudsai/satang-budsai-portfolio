import type { DiagramId, L, Lang } from '@/content/types'
import { cn } from '@/lib/utils'

type DiagramNode = { label: string | L; sub?: string | L; strong?: boolean }
type Layer = { nodes: DiagramNode[]; via?: string | L }
type LayeredDiagram = { layers: Layer[]; footer?: string | L }

const text = (value: string | L | undefined, lang: Lang) =>
  value === undefined || typeof value === 'string' ? value : value[lang]

/**
 * Architecture drawings for work that can't be shown as screenshots.
 * Redrawn from the systems' structure: no real screens, data or card templates.
 */
const diagrams: Record<Exclude<DiagramId, 'pdf-fixer'>, LayeredDiagram> = {
  'eec-id': {
    layers: [
      {
        nodes: [
          { label: 'Flutter app', sub: 'NFC · OCR · face', strong: true },
          { label: { th: 'เว็บเจ้าหน้าที่', en: 'Officer portal' }, sub: 'Next.js' },
          { label: { th: 'แอปพันธมิตร', en: 'Partner apps' }, sub: 'OIDC + PKCE' }
        ]
      },
      {
        via: 'OIDC',
        nodes: [
          {
            label: { th: 'ผู้ให้บริการตัวตน', en: 'Identity provider' },
            sub: 'ZITADEL + custom auth web',
            strong: true
          }
        ]
      },
      {
        via: 'REST · gRPC',
        nodes: [
          { label: 'Mobile service', strong: true },
          { label: 'Face match' },
          { label: 'Passport OCR' },
          { label: 'DGA gateway' },
          { label: 'Payment' },
          { label: 'Notification' }
        ]
      }
    ],
    footer: { th: 'stack ของทั้งระบบ: Kafka · SignalR · PostgreSQL', en: 'System stack: Kafka · SignalR · PostgreSQL' }
  },
  'eec-customs': {
    layers: [
      {
        nodes: [
          { label: { th: 'บริษัทผู้ยื่นคำขอ', en: 'Companies' }, sub: 'Next.js 16' },
          { label: { th: 'เจ้าหน้าที่', en: 'Officers' }, sub: 'Next.js 16' }
        ]
      },
      {
        via: 'REST · SignalR',
        nodes: [
          { label: 'Core service', sub: '.NET 10 · CQRS', strong: true },
          { label: 'Payment service', strong: true },
          { label: 'Report service', sub: 'Qorstack · Gotenberg' }
        ]
      },
      {
        via: 'RabbitMQ',
        nodes: [
          { label: 'Worker' },
          { label: 'Schedule', sub: 'Hangfire' },
          { label: 'External gateway', strong: true }
        ]
      },
      {
        via: { th: 'ระบบภายนอก', en: 'outside systems' },
        nodes: [
          { label: 'DGA', sub: { th: 'ลายเซ็นดิจิทัล · sync', en: 'digital signature · sync' } },
          { label: 'NSW customs', sub: 'async · polling' }
        ]
      }
    ],
    footer: 'PostgreSQL 17 · Redis · MinIO · OpenTelemetry · Kubernetes (Kustomize + Fleet)'
  },
  'airport-gate': {
    layers: [
      { nodes: [{ label: { th: 'หน้าเว็บ', en: 'Web app' }, sub: 'Next.js', strong: true }] },
      { via: 'REST', nodes: [{ label: 'API', sub: 'C# .NET', strong: true }] },
      {
        via: { th: 'ข้อมูลรายงาน', en: 'report data' },
        nodes: [{ label: 'FastReport', sub: { th: 'template', en: 'templates' } }]
      },
      { via: 'export', nodes: [{ label: 'PDF' }, { label: 'Excel' }] }
    ]
  },
  'lampang-health': {
    layers: [
      { nodes: [{ label: { th: 'เว็บ รพ.สต. 200+ แห่ง', en: '200+ hospital sites' }, sub: 'React', strong: true }] },
      {
        via: { th: 'ขอรายงาน', en: 'request a report' },
        nodes: [
          { label: 'API', sub: '.NET', strong: true },
          { label: { th: 'ล็อกอิน', en: 'Sign-in' }, sub: 'Cognito | FusionAuth' }
        ]
      },
      {
        via: { th: 'เข้าคิว', en: 'queued' },
        nodes: [
          {
            label: { th: 'Background worker', en: 'Background worker' },
            sub: { th: 'สร้างรายงาน', en: 'builds the report' }
          }
        ]
      },
      { via: { th: 'เสร็จแล้ว', en: 'ready' }, nodes: [{ label: { th: 'ดาวน์โหลดไฟล์', en: 'File download' } }] }
    ]
  }
}

function Connector({ label, lang }: { label?: string | L; lang: Lang }) {
  return (
    <div className='relative flex h-14 items-center justify-center' aria-hidden='true'>
      <span className='absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line-strong' />
      <span className='diagram-pulse absolute top-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-primary' />
      {label ? (
        <span className='relative rounded-full border border-line bg-background px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground'>
          {text(label, lang)}
        </span>
      ) : null}
    </div>
  )
}

function PdfFixer({ lang, className }: { lang: Lang; className?: string }) {
  const before = lang === 'th' ? 'ก่อน' : 'Before'
  const after = lang === 'th' ? 'หลัง' : 'After'
  return (
    <div className={cn('grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2', className)}>
      <div className='flex flex-col gap-5 bg-card p-6 sm:p-8'>
        <span className='eyebrow'>{before} · PDF</span>
        <p className='pdf-line font-mono text-lg leading-relaxed text-muted-foreground sm:text-xl'>
          ส ำนักงำนคณะกรรมกำร
          <br />
          ผู ้ขอรับบริกำร
        </p>
        <p className='font-mono text-xs text-muted-foreground'>
          {lang === 'th' ? 'โปรแกรมอ่านหน้าจออ่านเป็นคำที่ไม่มีความหมาย' : 'Screen reader: unreadable'}
        </p>
      </div>
      <div className='flex flex-col gap-5 bg-card p-6 sm:p-8'>
        <span className='eyebrow text-primary'>{after} · Word</span>
        <p className='pdf-line text-lg leading-relaxed sm:text-xl'>
          สำนักงานคณะกรรมการ
          <br />
          ผู้ขอรับบริการ
        </p>
        <p className='font-mono text-xs text-primary'>
          {lang === 'th' ? 'NVDA อ่านได้ถูกต้อง' : 'NVDA reads it correctly'}
        </p>
      </div>
    </div>
  )
}

export default function Diagram({
  id,
  lang,
  label,
  className
}: {
  id: DiagramId
  lang: Lang
  label: string
  className?: string
}) {
  if (id === 'pdf-fixer') {
    return (
      <figure className={className} aria-label={label}>
        <PdfFixer lang={lang} />
      </figure>
    )
  }

  const diagram = diagrams[id]
  return (
    <figure
      aria-label={label}
      className={cn('rounded-2xl border border-line bg-card px-4 py-8 sm:px-10 sm:py-12', className)}>
      <div className='flex flex-col'>
        {diagram.layers.map((layer, index) => (
          <div key={index}>
            {index > 0 ? <Connector label={layer.via} lang={lang} /> : null}
            <div className='flex flex-wrap justify-center gap-3'>
              {layer.nodes.map((node, nodeIndex) => (
                <div
                  key={nodeIndex}
                  className={cn(
                    'min-w-[8.5rem] rounded-xl border px-4 py-3 text-center',
                    node.strong ? 'border-primary/70 bg-primary/[0.06]' : 'border-line-strong'
                  )}>
                  <div className='text-sm font-semibold sm:text-base'>{text(node.label, lang)}</div>
                  {node.sub ? (
                    <div className='mt-0.5 font-mono text-[11px] text-muted-foreground'>{text(node.sub, lang)}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {diagram.footer ? (
        <figcaption className='mt-8 border-t border-line pt-4 text-center font-mono text-xs text-muted-foreground'>
          {text(diagram.footer, lang)}
        </figcaption>
      ) : null}
    </figure>
  )
}
