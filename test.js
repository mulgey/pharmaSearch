script.
    const selectedFilters = {
    retrospective: ["1"],
    wardfocused: [],
    indicationfocused: [],
    activesubstance: []
    };

    const items = [
    {
    title: "Real-world evidence of high-cost drugs for metastatic melanoma: effectiveness, compliance to clinical practice guidelines and economic evaluation",
    url: "https://ejhp.bmj.com/content/26/Suppl_1/A5.1",
    filters: {
        retrospective: ["1"],
        wardfocused: ["2"],
        indicationfocused: ["1"],
        activesubstance: ["2"]
    }
    },
    {
    title: "Real-world safety and tolerability of the recently commercialised palbociclib",
    url: "https://ejhp.bmj.com/content/26/Suppl_1/A223.2",
    filters: {
        retrospective: ["2"],
        wardfocused: ["1"],
        indication_focused: ["2"],
        activesubstance: ["Palbociclib"]
    }
    },
    {
    name: "Cost-effectiveness of morphine versus fentanyl in managing ventilated neonates with respiratory distress syndrome in the intensive care setting",
    url: "https://ejhp.bmj.com/content/26/Suppl_1/A7.3",
    filters: {
        retrospective: ["1"],
        wardfocused: ["2"],
        indication_focused: ["1"],
        activesubstance: ["2"]
    }
    },
    {
    name: "Chemical risk assessement in a quality control laboratory by a tool using activity analysis",
    url: "https://ejhp.bmj.com/content/26/Suppl_1/A9.2",
    filters: {
        retrospective: ["1"],
        wardfocused: ["2"],
        indication_focused: ["1"],
        activesubstance: ["2"]
    }
    },
    {
    name: "The economic burden of metastatic breast cancer in Spain",
    url: "https://ejhp.bmj.com/content/27/1/19",
    filters: {
        retrospective: ["1"],
        wardfocused: ["2"],
        indication_focused: ["1"],
        activesubstance: ["2"]
    }
    }
    ];

    const filterArr01 = Object.values(selectedFilters).flat();

    const output = items.filter(({filters}) => {
        const objFilter = Object.values(filters).flat();
        return filterArr01.every(val => objFilter.includes(val));
    })
    console.log(output);