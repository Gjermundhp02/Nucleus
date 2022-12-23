import { DARK, LIGHT, ABYSS, SUNSET, CHRISTMAS, EASTER } from "./themes";

export default function FetchColor(theme, variable) {    
    switch (theme) {
    case 0: 
        switch (variable) {
            case 'BACKGROUND':              return DARK.BACKGROUND
            case 'DARKER':                  return DARK.DARKER
            case 'CONTRAST':                return DARK.CONTRAST
            case 'ORANGE':                  return DARK.ORANGE
            case 'TEXTCOLOR':               return DARK.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return DARK.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return DARK.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return DARK.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return DARK.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return DARK.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return DARK.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    case 1: 
        switch (variable) {
            case 'BACKGROUND':              return LIGHT.BACKGROUND
            case 'DARKER':                  return LIGHT.DARKER
            case 'CONTRAST':                return LIGHT.CONTRAST
            case 'ORANGE':                  return LIGHT.ORANGE
            case 'TEXTCOLOR':               return LIGHT.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return LIGHT.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return LIGHT.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return LIGHT.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return LIGHT.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return LIGHT.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return LIGHT.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    case 2: 
        switch (variable) {
            case 'BACKGROUND':              return ABYSS.BACKGROUND
            case 'DARKER':                  return ABYSS.DARKER
            case 'CONTRAST':                return ABYSS.CONTRAST
            case 'ORANGE':                  return ABYSS.ORANGE
            case 'TEXTCOLOR':               return ABYSS.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return ABYSS.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return ABYSS.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return ABYSS.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return ABYSS.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return ABYSS.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return ABYSS.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    case 3: 
        switch (variable) {
            case 'BACKGROUND':              return SUNSET.BACKGROUND
            case 'DARKER':                  return SUNSET.DARKER
            case 'CONTRAST':                return SUNSET.CONTRAST
            case 'ORANGE':                  return SUNSET.ORANGE
            case 'TEXTCOLOR':               return SUNSET.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return SUNSET.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return SUNSET.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return SUNSET.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return SUNSET.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return SUNSET.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return SUNSET.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    case 4: 
        switch (variable) {
            case 'BACKGROUND':              return CHRISTMAS.BACKGROUND
            case 'DARKER':                  return CHRISTMAS.DARKER
            case 'CONTRAST':                return CHRISTMAS.CONTRAST
            case 'ORANGE':                  return CHRISTMAS.ORANGE
            case 'TEXTCOLOR':               return CHRISTMAS.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return CHRISTMAS.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return CHRISTMAS.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return CHRISTMAS.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return CHRISTMAS.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return CHRISTMAS.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return CHRISTMAS.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    case 5: 
        switch (variable) {
            case 'BACKGROUND':              return EASTER.BACKGROUND
            case 'DARKER':                  return EASTER.DARKER
            case 'CONTRAST':                return EASTER.CONTRAST
            case 'ORANGE':                  return EASTER.ORANGE
            case 'TEXTCOLOR':               return EASTER.TEXTCOLOR
            case 'OPPOSITETEXTCOLOR':       return EASTER.OPPOSITETEXTCOLOR
            case 'TITLETEXTCOLOR':          return EASTER.TITLETEXTCOLOR
            case 'SWITCHONSTATE':           return EASTER.SWITCHONSTATE
            case 'SWITCHOFFSTATE':          return EASTER.SWITCHOFFSTATE
            case 'TRACKCOLOR':              return EASTER.TRACKCOLOR
            case 'TRACKBACKGROUNDCOLOR':    return EASTER.TRACKBACKGROUNDCOLOR
            default:                        return 'red';
        }

    default: return 'red';
    }
}