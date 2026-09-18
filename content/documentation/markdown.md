+++
title = "Markdown demo"
weight = 3

[extra]
url = "https://example.fluxer.host/example#example"
description = "lorem ipsum idolor, test entry because why not"
tags = ["Hello World", "123", "67"]
+++

A quick tour of what the theme renders: paragraphs, emphasis, lists, quotes, code, tables and more. If something looks off here, tell me on the FluxerHost community.

A soft line
continues the same paragraph, a blank line starts a new one.

[hello world](https://fluxer.app/) is a regular link.

# header
## tiny header
### tinier header

1. first
2. second
    - nested
        - deeper :3
* bullet
+ plus
- dash
- mixed markers
    - more nesting

**bold**, __boldscore__, *italic*, _italicscore_, ***italicbold***, ___italicboldscore___
<ins>underline</ins> the good parts, ~~striketrough~~ the mid ideas

> quote

```json
{
  "codeblock": "code"
}
```

![fluxer logo](/assets/fluxer.svg)

## tables

| left | center | right |
|:-----|:------:|------:|
| a    | b      | c     |
| longer cell | **bold cell** | `code cell` |
| x    | y      | z     |

| one | two | three | four |
|:-|:-|:-|:-|
|a |b |c |d |

styling might get tweaked (probably yeah)

## inline code

inline `code`, code with `a | pipe | inside`, ``a ` backtick`` and a really long inline snippet like `sudo apt update kernel nvidia chromium firefox kernelbutbetter dontrunthiscommandforreal test` to test wrapping.

## more code

```python
def hello(name: str) -> str:
    """greet someone"""
    return f"hello {name}!"  # very long line to test horizontal overflow of pre blocks hello hello hello hello hello hello
```

```
no language, plain pre block
    indented line
        deeper indent
```

## quotes

> simple quote

> quoted paragraph one
>
> > nested quote
>
> back out, with **bold** and `code`

> - quoted list
> - second item

## lists

- [ ] task todo
- [x] task done

1. first
2. second
    1. nested ordered
    2. nested ordered two
3. third with a [link](https://fluxer.host/)

- list item with a paragraph

  continuation text after a blank line

- another item

## links and refs

[reference link][ref] and an autolink: https://fluxer.gg

A very long unbroken url to test overflow: `https://fluxer.host/intotheinfinityandbeyond?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee`

[ref]: https://fluxer.how

## details

<details>
<summary>click to expand</summary>

hidden **markdown** content inside details

</details>

keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>C</kbd>, H<sub>2</sub>O, x<sup>2</sup>

## separators

---

above this line was a thematic break

## long words

eee aaa wahoo supercalifragilisticexpialidocious­and­then­some­more­text­without­real­breaks plus punctuation!!!!!!!!!!!!!!!!!!!!!!! to stress line breaking
