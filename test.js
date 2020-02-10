// 原理：https://blog.csdn.net/u011463794/article/details/85220335
// 使用栈实现计算器功能:此计算器只包含加减乘除括号运行
function zl_calculator_zl(express) {
    //先去掉表达式中的所有空格
    var express = express.replace(/\s/g, "");
    // console.log(express)
    //---------------把中缀表达式转换为后缀表达式-----------------------
    var houExpress = [];//初始的后缀表达式（以数组形式存储）
    var symbolStack = [];//初始化的符号栈

    //得到运算符优先级量化的函数
    function getLea(sy) {
        if (sy == "+" || sy == "-") {
            return 1;  //+，-优先级较低为1
        }
        else if (sy == "*" || sy == "/") {
            return 2; //*，/优先级较高为2
        }
        else return 0; //如果不为加减乘除符号，则量化为0
    }
    //判断某个字符是否为数字字符的函数(包含了小数)
    function isNumber(n) {
        var ns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
        return ns.includes(n)
    }
    //判断某个字符串是否为运算符
    function isOpt(n) {
        var opts = ['+', '-', '*', '/']
        return opts.includes(n)
    }
    //开始把中缀表达式转换为右缀表达式
    var itemNumber = "";//表示临时运算数
    var itemSy = "";//表示临时运算符
    for (let i = 0; i < express.length; i++) {
        // console.log(express[i])
        if (express[i] == "(") {
            //入栈
            symbolStack.push(express[i]);
        }
        else if (express[i] == ")") {
            //依次把运算符栈中的的运算符加入后缀表达式中，直到出现’(’，从栈中删除’(’
            while (symbolStack[symbolStack.length - 1] != "(") {
                houExpress.push(symbolStack.pop())
            }
            symbolStack.pop();//直到出现’(’，从栈中删除’(’

        }
        else if (isNumber(express[i])) {  //如果是数字
            itemNumber += express[i];
            if (i == express.length - 1) {
                houExpress.push(itemNumber);// 如果当前数是最后一位数，则直接将运算数加入到后缀表达式数组中
                itemNumber = "";
            }
            else if (express[i + 1] == ")") {
                houExpress.push(itemNumber);// 当数字后面是）符号时，将运算数加入到后缀表达式数组中，因为）运算在前面被拦截了
                itemNumber = "";

            }
        }
        else { //如果是运算符
            // console.log("数字：", itemNumber, express[i])

            if (itemNumber !== "") houExpress.push(itemNumber);// 通过判断itemNumber是否为而得之此数字是否已经在前面添加了，如果未添加，则将运算数加入到后缀表达式数组中

            itemNumber = "";//重置临时运算数变量已接收下个数
            itemSy = express[i];//如果是运算符，（执行到这里，说明上一个数包括可能存在的小数点都拿到了，然后把当前符号保存下就开始处理上面的数）
            //运算符入栈规则
            // console.log("显示所有的运算符：",itemSy,symbolStack);
            if (symbolStack.length === 0) symbolStack.push(itemSy);//如果运算符的栈为空,直接将运算符入栈
            else if (symbolStack[symbolStack.length - 1] === "(") symbolStack.push(itemSy);//如果运算符的栈顶是"(",直接将运算符入栈
            else if (getLea(itemSy) > getLea(symbolStack[symbolStack.length - 1])) {//如果当前运算符大于栈顶运算符的优先级，直接入栈
                // console.log("打印出当前运算符合栈顶运算符：",itemSy,getLea(itemSy),symbolStack[symbolStack.length - 1],getLea(symbolStack[symbolStack.length - 1]))
                symbolStack.push(itemSy);
            }
            else {//如果当前运算符小于等于栈顶运算符,则弹出栈顶运算符加入到后缀表达式中
                houExpress.push(symbolStack.pop())
                // console.log("后缀+符号", houExpress, symbolStack)
                //如果栈顶符号出栈后就空了，或者为(,或者优先级低于当前符号，那么就直接把当前的符号入栈
                if (symbolStack.length == 0 || symbolStack[symbolStack.length - 1] == "(" || getLea(itemSy) > getLea(symbolStack[symbolStack.length - 1])) {
                    symbolStack.push(itemSy);
                }
                else {  //说明出栈后的栈顶运算符优先级仍然大于等于当前于运算符，于是通过循环继续查找判断
                    var max = symbolStack.length - 1; //获取最大下标
                    while (getLea(itemSy) <= getLea(symbolStack[max])) {//继续在运算符栈里面查找：新的栈顶运算符是否还是大于等于当前运算符，如果大于等于则继续出栈
                        // console.log(symbolStack, "符号比较：", itemSy, getLea(itemSy), symbolStack[max], getLea(symbolStack[max]));
                        houExpress.push(symbolStack.pop())
                        if (max > 0) max--;
                        else {
                            symbolStack.push(itemSy)
                            break;
                        }
                    }
                }
            }
            // console.log("运算符栈",symbolStack)
            itemSy = "";//重置临时运算符变量,以便下次运算

        }
    }
    //如果扫描的中缀表达式结束时，运算符栈中的还有符号，则所有符号出栈；
    symbolStack.reverse()
    houExpress = houExpress.concat(symbolStack);
    symbolStack = [];//重置运算符数组栈
    // console.log("中缀", express);
    // console.log("后缀", houExpress);
    //---------------------- 对后缀表达式进行计算 --------------------
    var numStack = []; //数字栈
    //从左到右读后缀表达式
    for (let i = 0; i < houExpress.length; i++) {
        //遇到操作数压入数字栈中
        if (!isOpt(houExpress[i])) numStack.push(houExpress[i]);
        //遇到操作符取并弹出栈顶n个元素，（n取决于操作符是n元操作符），计算结果压入栈中
        else {
            var res = 0;
            var maxv = numStack.length - 1;
            if (houExpress[i] == "+") {
                res = parseFloat(numStack[maxv - 1]) + parseFloat(numStack[maxv]);
            }
            else if (houExpress[i] == "-") {
                res = parseFloat(numStack[maxv - 1]) - parseFloat(numStack[maxv]);
            }
            else if (houExpress[i] == "*") {
                res = parseFloat(numStack[maxv - 1]) * parseFloat(numStack[maxv]);
            }
            else {
                res = parseFloat(numStack[maxv - 1]) / parseFloat(numStack[maxv]);
            }
            numStack.pop();
            numStack.pop();
            numStack.push(res);
        }
    }
    //后缀表达式读完，当前栈顶元素即为结果
    // console.log("结果为：", numStack[0])
    return numStack[0]; //返回结果

}


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