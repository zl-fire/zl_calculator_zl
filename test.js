var {zl_calculator_zl}=require('./main.js');


console.assert(zl_calculator_zl("50+(1+2+3+4)*5/2") == 75, `50+(1+2+3+4)*5/2==75 断言失败！`)
console.assert(zl_calculator_zl("1+2+3+4+5") == 15, `1+2+3+4+5==15 断言失败！`)
console.assert(zl_calculator_zl("90-20-20") == 50, `90-20-20==50 断言失败！`)
console.assert(zl_calculator_zl("1*2*5-5+4+1") == 10, `1*2*5-5+4+1==10 断言失败！`)
console.assert(zl_calculator_zl("3+(1+5)*2") == 15, `3+(1+5)*2==15 `)
console.assert(zl_calculator_zl("((1+9-5)/5+9)*2") == 20, `"((1+9-5)/5+9)*2==20 断言失败！`)
console.assert(zl_calculator_zl("(3+7)*5-49") == 1, `(3+7)*5-49==1 断言失败！`)
console.assert(zl_calculator_zl("(1.2+0.8+3)/5") == 1, `(1.2+0.8+3)/5==1 断言失败！`)
console.assert(zl_calculator_zl("3+(1.2+0.8+3)/5+7") == 11, `3+(1.2+0.8+3)/5+7==11 断言失败！`)
console.assert(zl_calculator_zl("((10-9)/10*(5+(40+60)*0.05))") == 1, `((10-9)/10*(5+(40+60)*0.05))==1 断言失败！`)
console.assert(zl_calculator_zl("((4+6)*5-40)%3") == 1, `((4+6)*5-40)%3==1 断言失败！`) //%代表取余数