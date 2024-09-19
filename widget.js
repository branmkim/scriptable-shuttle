let items = await loadItems()

let colors = {
    red: new Color("#f44c2f"),
    orange: new Color("#f57200"),
    yellow: new Color("#f3b400"),
    green: new Color("#1ba91b"),
    blue: new Color("#3095d3"),
    purple: new Color("#8500eb"),
    pink: new Color("#e665b3"),
    brown: new Color("#b19a92"),
}

if (config.runsInWidget) {
    let widget = createWidget(items)
    Script.setWidget(widget)
    Script.complete()
} 

function createWidget(items) {
    let widget = new ListWidget()
    widget.setPadding(10, 10, 10, 10)

    let wh = widget.addStack()
    wh.layoutHorizontally()
    wh.setPadding(10, 10, 10, 10)

    let wv = wh.addStack()
    wv.layoutVertically()
    
    wv.addSpacer(8)

    let dueSection = items.results[0].due
    items.results.forEach((item) => {
        if(dueSection != item.due) {
            dueSection = item.due
            wv.addSpacer(8)
        }
        let itemStack = wv.addStack()
        itemStack.layoutHorizontally()
        let dot = itemStack.addText(item.done ? "●" : "○")
        dot.font = Font.systemFont(12)
        itemStack.addSpacer(4)
        let text = itemStack.addText(item.name)
        text.textColor = colors[item.color]
        text.font = Font.systemFont(12)
        dot.textColor = colors[item.color]
        wv.addSpacer(4)
    })

    wh.addSpacer()
    wv.addSpacer()

    return widget
}
  
async function loadItems() {
    let url = "https://scriptable-notion-helper.vercel.app/api"
    let req = new Request(url)
    let json = await req.loadJSON()
    return json
}