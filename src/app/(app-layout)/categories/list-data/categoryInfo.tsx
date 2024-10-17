'use client'
import GettingStartedSample from '@/app/finance/samples/samples/gettingStartedSample/GettingStartedSample';
import { Button } from '@/components/ui/button';
import React from 'react';

const CategoryInfo = (props: any) => {
    const { record } = props;
    return (
        <div className='w-full p-4'>
            <div className='text-lg font-medium'>
                {record?.categoryName}
            </div>
            <span className='text-sm'>
                {record?.categoryDescription}
            </span>
            {/* <div className="relative flex w-96 flex-col rounded-lg border border-slate-200 bg-white shadow-sm mt-8">
                <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
                    {record.categoryListValues?.map((info: any, index: any) => (
                        <div key={info.name}>
                            <div
                                role="button"
                                className="text-slate-800 flex w-full items-center rounded-md p-1 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
                            >
                                <div>
                                    <h6 className="text-slate-800 font-medium">
                                        {info.name}
                                    </h6>
                                </div>
                            </div>
                            {index !== record.categoryListValues.length - 1 && (
                                <div className='w-full flex justify-center'>
                                    <div className="border-b border-1 w-full" />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div> */}
            <div className='mt-8'>
                <GettingStartedSample
                    listRows={record.categoryListValues}
                    selectedRecord={record}
                />
            </div>

        </div>
    )
};

export default CategoryInfo;