console.log("Script is running successfully!");

(() => {
    const init = () => {
        const root = document.body
        const menu = document.querySelector('.nav__menu')
        const toggle = document.querySelector('.nav__toggle')
        const theme = document.querySelector('.theme-toggle')
        const stored = window.localStorage.getItem('prodesk-theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        let explicitTheme = stored === 'dark' || stored === 'light'

        if (stored === 'dark' || (!explicitTheme && systemTheme.matches)) root.classList.add('site-body--dark')
        if (stored === 'light') root.classList.add('site-body--light')

        const syncTheme = () => {
            const dark = root.classList.contains('site-body--dark') ||
                (!root.classList.contains('site-body--light') && systemTheme.matches)
            theme?.setAttribute('aria-pressed', String(dark))
            theme?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode')
        }

        toggle?.addEventListener('click', () => {
            const open = toggle.getAttribute('aria-expanded') === 'true'
            toggle.setAttribute('aria-expanded', String(!open))
            toggle.querySelector('.nav__toggle-label').textContent = open ? 'Open menu' : 'Close menu'
            menu?.classList.toggle('nav__menu--open', !open)
        })

        menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
            toggle?.setAttribute('aria-expanded', 'false')
            toggle?.querySelector('.nav__toggle-label')?.replaceChildren(document.createTextNode('Open menu'))
            menu.classList.remove('nav__menu--open')
        }))

        theme?.addEventListener('click', () => {
            const dark = root.classList.contains('site-body--dark') ||
                (!root.classList.contains('site-body--light') && systemTheme.matches)
            explicitTheme = true
            root.classList.toggle('site-body--dark', !dark)
            root.classList.toggle('site-body--light', dark)
            window.localStorage.setItem('prodesk-theme', dark ? 'light' : 'dark')
            syncTheme()
        })

        systemTheme.addEventListener('change', () => {
            if (!explicitTheme) root.classList.toggle('site-body--dark', systemTheme.matches)
            syncTheme()
        })
        syncTheme()
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init)
    else init()
})()