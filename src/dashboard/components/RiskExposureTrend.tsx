import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MONTHLY_TREND_DATA } from '../dashboard-data'
import { TrendingDown } from 'lucide-react'

export function RiskExposureTrend() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Chart coordinates calculation (SVG viewBox: 0 0 600 200)
  // Max value: 7.2M, Min value: 4.0M
  const minVal = 4.0
  const maxVal = 7.2
  const width = 600
  const height = 180
  const paddingX = 35
  const paddingY = 25

  const pointsCount = MONTHLY_TREND_DATA.length
  const stepX = (width - paddingX * 2) / (pointsCount - 1)

  const getY = (val: number) => {
    const ratio = (val - minVal) / (maxVal - minVal)
    return height - paddingY - ratio * (height - paddingY * 2)
  }

  const inherentPoints = MONTHLY_TREND_DATA.map((d, i) => `${paddingX + i * stepX},${getY(d.inherentExposure)}`).join(' ')
  const residualPoints = MONTHLY_TREND_DATA.map((d, i) => `${paddingX + i * stepX},${getY(d.residualExposure)}`).join(' ')

  const selectedPoint = hoveredIndex !== null ? MONTHLY_TREND_DATA[hoveredIndex] : MONTHLY_TREND_DATA[MONTHLY_TREND_DATA.length - 1]

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Risk Exposure Trend</CardTitle>
            <Badge variant="success" size="sm" className="gap-1 font-semibold">
              <TrendingDown className="size-3" />
              −8.2%
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Historical portfolio exposure across 10 months (Jan → Oct 2026)
          </CardDescription>
        </div>

        <div className="text-right">
          <span className="font-caption text-[var(--color-text-muted)]">Residual Trajectory</span>
          <p className="font-h3 font-bold tabular-nums text-[var(--color-text-primary)]">
            $5.6M → $4.8M
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* SVG Visualization */}
        <div className="relative w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-48 select-none"
            aria-label="Risk Exposure Trend Line Chart"
          >
            {/* Grid lines */}
            {[4.5, 5.5, 6.5].map((val) => {
              const y = getY(val)
              return (
                <g key={val}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeDasharray="3 3"
                    strokeWidth="1"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 3}
                    fill="var(--color-text-muted)"
                    fontSize="10"
                    textAnchor="end"
                    className="font-mono font-medium"
                  >
                    ${val.toFixed(1)}M
                  </text>
                </g>
              )
            })}

            {/* Inherent Line (dashed slate/grey) */}
            <polyline
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              points={inherentPoints}
            />

            {/* Residual Area & Line (primary blue) */}
            <polygon
              fill="var(--color-primary-subtle)"
              fillOpacity="0.45"
              points={`${paddingX},${getY(minVal)} ${residualPoints} ${width - paddingX},${getY(minVal)}`}
            />
            <polyline
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="3"
              points={residualPoints}
            />

            {/* Data points */}
            {MONTHLY_TREND_DATA.map((d, i) => {
              const x = paddingX + i * stepX
              const yResidual = getY(d.residualExposure)
              const yInherent = getY(d.inherentExposure)
              const isHovered = hoveredIndex === i

              return (
                <g key={d.month}>
                  {/* Vertical hover guide */}
                  {isHovered && (
                    <line
                      x1={x}
                      y1={paddingY}
                      x2={x}
                      y2={height - paddingY}
                      stroke="var(--color-primary)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  )}

                  {/* Inherent Point */}
                  <circle
                    cx={x}
                    cy={yInherent}
                    r={isHovered ? 4.5 : 3}
                    fill="var(--color-surface)"
                    stroke="var(--color-text-muted)"
                    strokeWidth="2"
                  />

                  {/* Residual Point */}
                  <circle
                    cx={x}
                    cy={yResidual}
                    r={isHovered ? 5.5 : 4}
                    fill="var(--color-surface)"
                    stroke="var(--color-primary)"
                    strokeWidth="2.5"
                  />

                  {/* X-axis Month Label */}
                  <text
                    x={x}
                    y={height - 6}
                    fill={isHovered ? 'var(--color-text-primary)' : 'var(--color-text-muted)'}
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>

                  {/* Transparent hover target */}
                  <rect
                    x={x - stepX / 2}
                    y={0}
                    width={stepX}
                    height={height}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </g>
              )
            })}
          </svg>
        </div>

        {/* Legend and Active Month Inspector */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-2 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-caption text-[var(--color-text-secondary)]">
              <span className="h-0.5 w-4 bg-[var(--color-primary)] inline-block" />
              <span>Residual Exposure (Mitigated)</span>
            </div>
            <div className="flex items-center gap-1.5 font-caption text-[var(--color-text-muted)]">
              <span className="h-0.5 w-4 border-b border-dashed border-[var(--color-text-muted)] inline-block" />
              <span>Inherent Exposure (Unmitigated)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-caption text-[var(--color-text-primary)] font-medium">
            <span className="font-semibold text-[var(--color-text-muted)]">{selectedPoint.month} 2026:</span>
            <span>Residual: <strong className="text-[var(--color-primary)]">${selectedPoint.residualExposure}M</strong></span>
            <span className="text-[var(--color-border-strong)]">|</span>
            <span>Inherent: <strong className="text-[var(--color-text-secondary)]">${selectedPoint.inherentExposure}M</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
