(() => {
    const init = () => {
        const root = document.body
        const menu = document.querySelector('.nav__menu')
        const toggle = document.querySelector('.nav__toggle')
        const theme = document.querySelector('.theme-toggle')
        const stored = window.localStorage.getItem('prodesk-theme')

        if (stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) root.classList.add('dark')
        if (stored === 'light') root.classList.add('light')

        const syncTheme = () => {
            const dark = root.classList.contains('dark')
            theme?.setAttribute('aria-pressed', String(dark))
            theme?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode')
        }

        toggle?.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') === 'true'
            toggle.setAttribute('aria-expanded', String(!open))
            toggle.querySelector('.sr-only').textContent = open ? 'Open menu' : 'Close menu'
            menu?.classList.toggle('nav__menu--open', !open)
        })

        menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            toggle?.setAttribute('aria-expanded', 'false')
            toggle?.querySelector('.sr-only')?.replaceChildren(document.createTextNode('Open menu'))
            menu.classList.remove('nav__menu--open')
        }))

        theme?.addEventListener('click', () => {
            const dark = root.classList.toggle('dark')
            root.classList.toggle('light', !dark)
            window.localStorage.setItem('prodesk-theme', dark ? 'dark' : 'light')
            syncTheme()
        })

        syncTheme()
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
    else init()
})()