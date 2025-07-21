'use client'

import { useMemo } from 'react'
import { Sun, Moon, SunMoon } from 'lucide-react'
import { Button } from '../ui/button'
import { useTheme } from 'next-themes'

const ThemeToggle = () => {
    const { theme, setTheme, themes } = useTheme()
    const Icon = useMemo(() => {
        if (theme === 'light') {
            return Sun
        }
        else if (theme === 'dark') {
            return Moon
        }
        return SunMoon
    }, [theme])

    function changeTheme() {
        const index = themes.findIndex(t => t === theme)
        const nextIndex = (index + 1) % themes.length;
        setTheme(themes[nextIndex])
    }

    return (
        <Button variant="outline" size="icon" onClick={changeTheme}>
            <Icon></Icon>
        </Button>
    )
}

export default ThemeToggle