export function timeRemaining(target, now = Date.now(), opts = {}) {
    const { maxUnits = 2, allowPast = true } = opts;
    const t = target instanceof Date ? target.getTime() : Number(target);
    const n = now instanceof Date ? now.getTime() : Number(now);
    let diff = t - n;
    const past = diff < 0;
    diff = Math.abs(diff);

    const units = [
        { name: 'year', ms: 365 * 24 * 60 * 60 * 1000 },
        { name: 'day', ms: 24 * 60 * 60 * 1000 },
        { name: 'hour', ms: 60 * 60 * 1000 },
        { name: 'minute', ms: 60 * 1000 },
        { name: 'second', ms: 1000 },
    ];

    const parts = [];
    for (const { name, ms } of units) {
        if (parts.length >= maxUnits) break;
        const val = Math.floor(diff / ms);
        if (val > 0) {
            parts.push(`${val} ${name}${val !== 1 ? 's' : ''}`);
            diff -= val * ms;
        }
    }

    const body = parts.length ? parts.join(', ') : 'less than a second';
    if (!allowPast) return body;
    return past ? `${body} ago` : `${body} left`;
}