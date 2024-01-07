import React from 'react'
import { Skeleton } from '../skeleton';
import { Card, CardContent, CardHeader } from '../card';

const WeatherCardSkeleton: React.FC = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row justify-between' >
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </CardHeader>
      <CardContent className='flex flex-col gap-2' >
        <div className='flex gap-2' >
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-10 w-10 rounded-sm" />
        </div>
        <div className='flex flex-row justify-between' >
          <div className='flex flex-col gap-2' >
            <Skeleton className="h-16 w-28 rounded-sm" />
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>
          <div className='flex flex-col justify-end gap-2'>
            <Skeleton className="h-3 w-24 rounded-full" />
            <Skeleton className="h-3 w-24 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherCardSkeleton;