/**
 * Native scrolling keeps long sticky showcase sections pinned correctly.
 * Lenis looked smoother, but it could desync sticky project panels after the
 * dotted canvas background was added.
 */
export default function SmoothScroll({ children }) {
    return <>{children}</>;
}
