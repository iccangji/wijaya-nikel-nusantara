import React from 'react'
import { Link } from '@inertiajs/react'

type children = {
    children: React.ReactNode
}
export default function Layout({ children }: children) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}