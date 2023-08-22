/**
 * @jest-environment jsdom
 */

import { assembleLink, createGridLink } from './Link';

import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('assembleLink()', () => {
    it('returns anchor HTML element', () => {
        render(assembleLink({}, '', 'Google'));
        const anchor = screen.getByRole('link', { name: 'Google' });
        expect(anchor).toBeInstanceOf(HTMLAnchorElement);
    });

    it('returns anchor HTML element with correct href', () => {
        render(assembleLink({}, 'https://www.google.com/', 'Google'));
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: 'Google',
        });
        expect(anchor.href).toBe('https://www.google.com/');
    });

    it('returns anchor HTML element with correct text', () => {
        render(assembleLink({}, 'https://www.google.com/search?q=', 'Google'));
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: 'Google',
        });
        expect(anchor.textContent).toBe('Google');
    });

    it('returns anchor HTML element with correct query params', () => {
        render(
            assembleLink(
                { q: 'optimo' },
                'https://www.google.com/search',
                'Google',
            ),
        );
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: 'Google',
        });
        expect(anchor.href).toBe('https://www.google.com/search?q=optimo');
    });

    it('returns anchor HTML element with localhost href when baseUrl is not provided', () => {
        render(assembleLink({}, '', 'Google'));
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: 'Google',
        });
        expect(anchor.href).toBe('http://localhost/');
    });

    it('returns anchor HTML element with "_blank" target', () => {
        render(assembleLink({}, '', ''));
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: '',
        });
        expect(anchor.target).toBe('_blank');
    });

    it('returns anchor HTML element with "noreferrer" rel', () => {
        render(assembleLink({}, '', ''));
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: '',
        });
        expect(anchor.rel).toBe('noreferrer');
    });
});

describe('createGridLink()', () => {
    it('returns displayedText wrapped in the <span> tag if an id is falsy, does not contain anchor', () => {
        render(createGridLink('', '', 'Displayed Text'));
        const span = screen.getByText<HTMLSpanElement>('Displayed Text');
        expect(span.textContent).toBe('Displayed Text');
        expect(span).toBeInstanceOf(HTMLSpanElement);
        expect(
            screen.queryByRole('link', { name: 'Displayed Text' }),
        ).not.toBeInTheDocument();
    });

    it('returns anchor tag if an id is truly with correct href, text, ref, target, and wrapped in <span> tag', () => {
        render(
            createGridLink('id', 'https://www.google.com/', 'Displayed Text'),
        );
        const anchor = screen.getByRole<HTMLAnchorElement>('link', {
            name: 'Displayed Text',
        });
        expect(anchor.href).toBe('https://www.google.com/id');
        expect(anchor.textContent).toBe('Displayed Text');
        expect(anchor.target).toBe('_blank');
        expect(anchor.rel).toBe('noreferrer');
        expect(screen.getByText('Displayed Text').parentNode).toBeInstanceOf(
            HTMLSpanElement,
        );
    });
});
