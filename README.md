# zl_calculator
JavaScript之使用栈实现的计算器，可做加减乘除括号运算


# 一些断言测试示例[如果任何提示都没有那就表示全部断言成功]
console.assert(Calculator("1+2+3+4+5") == 15, `1+2+3+4+5==15 断言失败！`)
console.assert(Calculator("90-20-20") == 50, `90-20-20==50 断言失败！`)
console.assert(Calculator("1*2*5-5+4+1") == 10, `1*2*5-5+4+1==10 断言失败！`)
console.assert(Calculator("3+(1+5)*2") == 15, `3+(1+5)*2==15 `)
console.assert(Calculator("((1+9-5)/5+9)*2") == 20, `"((1+9-5)/5+9)*2==20 断言失败！`)
console.assert(Calculator("(3+7)*5-49") == 1, `(3+7)*5-49==1 断言失败！`)
console.assert(Calculator("(1.2+0.8+3)/5") == 1, `(1.2+0.8+3)/5==1 断言失败！`)
console.assert(Calculator("3+(1.2+0.8+3)/5+7") == 11, `3+(1.2+0.8+3)/5+7==11 断言失败！`)
console.assert(Calculator("((10-9)/10*(5+(40+60)*0.05))") == 1, `((10-9)/10*(5+(40+60)*0.05))==1 断言失败！`)


