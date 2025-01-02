import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { ArrowUpDown, StickyNote } from 'lucide-react'
import { Inbound } from '@/types'

// TODO:코드 분리+주석
const data: Inbound[] = [
  {
    'id': 'req-001',
    'name': '마음속그늘',
    'clientId': 'client-458',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '우울'
  },
  {
    'id': 'req-002',
    'name': '나만없어고양이',
    'clientId': 'client-521',
    'status': '매칭중',
    'requestDate': '2024-03-26',
    'problemCategory': '불안'
  },
  {
    'id': 'req-003',
    'name': '힘든하루',
    'clientId': 'client-632',
    'status': '상담진행중',
    'requestDate': '2024-03-25',
    'problemCategory': '가족'
  },
  {
    'id': 'req-004',
    'name': '꿈나무123',
    'clientId': 'client-445',
    'status': '완료',
    'requestDate': '2024-03-24',
    'problemCategory': '학업'
  },
  {
    'id': 'req-005',
    'name': '외로운밤하늘',
    'clientId': 'client-789',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '대인관계'
  },
  {
    'id': 'req-006',
    'name': '지친발걸음',
    'clientId': 'client-234',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '우울'
  },
  {
    'id': 'req-007',
    'name': '불안한하루',
    'clientId': 'client-567',
    'status': '매칭중',
    'requestDate': '2024-03-26',
    'problemCategory': '불안'
  },
  {
    'id': 'req-008',
    'name': '가족사랑12',
    'clientId': 'client-890',
    'status': '상담진행중',
    'requestDate': '2024-03-25',
    'problemCategory': '가족'
  },
  {
    'id': 'req-009',
    'name': '열공하자',
    'clientId': 'client-123',
    'status': '완료',
    'requestDate': '2024-03-24',
    'problemCategory': '학업'
  },
  {
    'id': 'req-010',
    'name': '혼자인밤',
    'clientId': 'client-456',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '대인관계'
  },
  {
    'id': 'req-011',
    'name': '우울한비',
    'clientId': 'client-789',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '우울'
  },
  {
    'id': 'req-012',
    'name': '걱정많아요',
    'clientId': 'client-012',
    'status': '매칭중',
    'requestDate': '2024-03-26',
    'problemCategory': '불안'
  },
  {
    'id': 'req-013',
    'name': '화목한날',
    'clientId': 'client-345',
    'status': '상담진행중',
    'requestDate': '2024-03-25',
    'problemCategory': '가족'
  },
  {
    'id': 'req-014',
    'name': '공부힘들어',
    'clientId': 'client-678',
    'status': '완료',
    'requestDate': '2024-03-24',
    'problemCategory': '학업'
  },
  {
    'id': 'req-015',
    'name': '친구없는밤',
    'clientId': 'client-901',
    'status': '신규',
    'requestDate': '2024-03-26',
    'problemCategory': '대인관계'
  }
]

export const columns: ColumnDef<Inbound>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'requestDate',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          요청시간
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue('requestDate')}</div>,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div>{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: '닉네임',
    cell: ({ row }) => (
      <div>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'problemCategory',
    header: '분류',
    cell: ({ row }) => (
      <div>{row.getValue('problemCategory')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return <div>{status}</div>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      // const inbound = row.original

      return (
        <button><StickyNote /></button>
      )
    },
  },
]

function InboundTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className='w-full'>
      <div className='flex items-center py-4 justify-between'>
        <Input
          placeholder='내담자 ID로 필터링...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <Select
          value={(table.getColumn('status')?.getFilterValue() as string) ?? 'all'}
          onValueChange={(value) =>
            table.getColumn('status')?.setFilterValue(
              value === 'all' ? undefined : value
            )
          }
        >
          <SelectTrigger className='w-[180px] ml-4'>
            <SelectValue placeholder='상태 선택' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>모든 상태</SelectItem>
            <SelectItem value='신규'>신규</SelectItem>
            <SelectItem value='매칭중'>매칭중</SelectItem>
            <SelectItem value='상담진행중'>상담진행중</SelectItem>
            <SelectItem value='완료'>완료</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length}개 중{' '}
          {/* {table.getFilteredRowModel().rows.length}개 선택됨 */}
          10개 선택됨
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'◀◀'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'◀'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'▶'}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'▶▶'}
          </Button>
        </div>
        <span className='flex items-center gap-1'>
          <div>페이지</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </strong>
        </span>
        <span className='flex items-center gap-1'>
          | 페이지 이동:
          <Input
            type='number'
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className='border p-1 rounded w-16'
          />
        </span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='페이지 크기' />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}개 보기
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default InboundTable