let getStyleArr = function(){
    let styleState = {
        blue: ['fontcolorBlue', 'fontcolorBluetwo','backcolorBlueone', 'backcolorBluetwo', 'backcolorBluethree', 'linearcolorBlue','bluepercent5','bluepercent10','blueborder','bluebottomborder'],
        purple:['fontcolorpurple','fontcolorpurpletwo','backcolorpurpleone','backcolorpurpletwo','backcolorpurplethree','linearcolorpurple','purplepercent5','purplepercent10','purpleborder','purplebottomborder'],
        base:['fontcolorBase','fontcolorBasetwo','backcolorBaseone','backcolorBasetwo','backcolorBasethree','linearcolorBase','Basepercent5','Basepercent10','Baseborder','Basebottomborder']
    }
    let colorStyleArr = styleState.base
    // switch (this.$store.state.colorStyle) {
    //     case '0': colorStyleArr = styleState.blue; break
    //     case '1': colorStyleArr = styleState.purple; break
    // }
    return colorStyleArr
}
export {getStyleArr}