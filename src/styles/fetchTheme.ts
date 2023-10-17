import themes from "@styles/themes.js"

type ColorProps = {
    theme: number
    variable: string
}

export default function FetchColor({ theme, variable }: ColorProps): string {
    let themeName = [
        "DARK",
        "LIGHT",
        "ABYSS",
        "SUNSET",
        "CHRISTMAS",
        "EASTER",
        "HALLOWEEN"
    ][theme]
    if(!themeName) return "red"

    return themes[themeName][variable] || "red"
    
}