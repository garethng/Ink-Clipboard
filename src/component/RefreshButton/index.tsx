'use client';
import React, {  useState, useEffect,  createContext, useContext } from 'react';
import { Button } from "@nextui-org/react";
import RefreshLoadingContext from '@/lib/refreshloadingcontext';;

  

export default function RefreshButton() {
    const { isLoading, setLoading, data, setData } = useContext(RefreshLoadingContext);
    return (
        <Button
            onClick={() => setLoading(true)}
            isLoading={isLoading}
            className="w-full flex max-w-[400px] mb-4 bg-slate-950 text-white"
        spinner={
        <svg
            className="animate-spin h-5 w-5 text-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            />
            <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
            />
        </svg>
        }
    >
            {isLoading ? "Loading" : "Refresh"}
    </Button>
    );
}
