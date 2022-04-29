import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function ALink ( { children, className, style, href, ...props } ) {
    if ( typeof href === 'object' ) {
        if ( !href.pathname ) {
            href.pathname = useRouter().pathname;
        }

        if ( href.query && href.query.grid ) {
            href.pathname.replace( '[grid]', href.query.grid );
        }
    }

    return (
        <>
            { href !== '#' ?
                <Link href={ href } { ...props }>
                    <a className={ className } style={ style }>
                        { children }
                    </a>
                </Link>
                : <a className={ className } href="#" onClick={ e => e.preventDefault() }>{ children }</a>
            }
        </>
    )
}