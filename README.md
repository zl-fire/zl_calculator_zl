
 
# 1. 模块基本说明
* 此模块是使用JavaScript，栈，实现的计算器，可做数字（包含小数和整数）间的加，减，乘，除，括号，取余，等运算
* 实现方式：将用户输入的中缀表达式转为后缀表达式，通过栈来实现，得到最终结果

# 2. 起因
 
在做微信小程序开发时，需要实现一个计算机功能，原本在做web开发时，都是使用的eval直接把用户输入的字符串表达式进行执行的,结果发现在微信小程序里面无法执行eval方法  。然后想用Function进行构造，然后发现还是不被微信小程序执行。

最后在网上百度了下解决方案，找到个rpn.js可以实现，但是等我使用时却发现她对于开始符号是括号的表达式不能正常处理，结果比较奇怪，去github上看了下，作者到现在也没去解决。然后在网上找了半天也没找到可以直接实现的方案。

这时忽然想起以前上大学学习 `数据结构` 时，期末专周就是使用c++,以栈的形式实现一个计算器功能，然后临时起意干脆用js实现下好了，
有了想法就做，马上动手，花了两个多小时，把这个程序写出来了然后写了各种表达式进行测试，暂时还没发现问题。

然后我把他发布成了一个npm包了，有需要的直接按照下面方式进行使用即可，欢迎进行各种测试和使用，有问题给我提issues

# 3. 模块使用方法

* ***使用`script`标签就进行引入使用***
   ```js
   对于这种方式，直接下载dist目录下的`zl_calculator_zl.js`文件使用即可
   如：
   <script src="./zl_calculator_zl.js"> </script>
   <script>

       //res就是返回的最终结果
       var res=zl_calculator_zl("3+(1.2+0.8+3)/5+7");

   </script>
   ```
* ***使用`import`方式引入使用***
   ```js
       1. 安装： npm i  zl_calculator_zl -S

       2. 引入： import {zl_calculator_zl} from 'zl_calculator_zl'

       3. 使用： var res=zl_calculator_zl("3+(1.2+0.8+3)/5+7");//res就是返回的最终结果
       
   </script>
   ```

* ***使用`require`方式在nodejs中引入使用***
   ```js
       1. 安装： npm i  zl_calculator_zl -S

       2. 引入： var { zl_calculator_zl } = require("zl_calculator_zl")

       3. 使用： var res=zl_calculator_zl("3+(1.2+0.8+3)/5+7");//res就是返回的最终结果
       
   </script>
   ```

* ***一些断言测试示例【如果任何提示都没有那就表示全部断言成功】***
```js
//这里我直接使用的console的assert方法进行断言，简单又直接😀

console.assert(zl_calculator_zl("1+2+3+4+5") == 15, `1+2+3+4+5==15 断言失败！`)
console.assert(zl_calculator_zl("90-20-20") == 50, `90-20-20==50 断言失败！`)
console.assert(zl_calculator_zl("1*2*5-5+4+1") == 10, `1*2*5-5+4+1==10 断言失败！`)
console.assert(zl_calculator_zl("50+(1+2+3+4)*5/2") == 75, `50+(1+2+3+4)*5/2==75 断言失败！`)
console.assert(zl_calculator_zl("3+(1+5)*2") == 15, `3+(1+5)*2==15 `)
console.assert(zl_calculator_zl("((1+9-5)/5+9)*2") == 20, `"((1+9-5)/5+9)*2==20 断言失败！`)
console.assert(zl_calculator_zl("(3+7)*5-49") == 1, `(3+7)*5-49==1 断言失败！`)
console.assert(zl_calculator_zl("(1.2+0.8+3)/5") == 1, `(1.2+0.8+3)/5==1 断言失败！`)
console.assert(zl_calculator_zl("3+(1.2+0.8+3)/5+7") == 11, `3+(1.2+0.8+3)/5+7==11 断言失败！`)
console.assert(zl_calculator_zl("((10-9)/10*(5+(40+60)*0.05))") == 1, `((10-9)/10*(5+(40+60)*0.05))==1 断言失败！`)
console.assert(zl_calculator_zl("((4+6)*5-40)%3") == 1, `((4+6)*5-40)%3==1 断言失败！`) //%代表取余数


```

# 4. 实现原理说明：
参考：https://blog.csdn.net/u011463794/article/details/85220335

后缀表达式，又称逆波兰式，指的是不包含括号，运算符放在两个运算对象的后面，所有的计算按运算符出现的顺序，严格从左向右进行，所以不需要算符优先级，这对我们编写计算器来说很好实现

比如给定一个中缀表达式：

	1 + 3 * 5 – ( 7 / 9 )

其后缀表达式应为：

	1 3 5 * + 7 9 / -


整体步骤
1. 中缀表达式转后缀表达式
2. 计算后缀表达式

**第一步：中缀表达式转后缀表达式**

1. 自左向右读入中缀表达式

    - 数字时，加入后缀表达式；

    - 运算符：
        - 若为 ‘(’，入栈
        - 若为 ‘)’，则依次把栈中的的运算符加入后缀表达式中，直到出现’(’，从栈中删除’(’
        - 若为除括号外的其他运算符， 当其优先级高于除’('以外的栈顶运算符时，直接入栈。否则从栈顶开始，依次弹出比当前处理的运算符优先级高和优先级相等的运算符，直到一个比它优先级低的或者遇到了一个左括号为止，然后将其自身压入栈中（先出后入）。

2. 当扫描的中缀表达式结束时，栈中的的所有运算符出栈；

**第二步：计算后缀表达式**
建立一个栈S 。从左到右读表达式，如果读到操作数就将它压入栈S中，如果读到n元运算符(即需要参数个数为n的运算符)则取出由栈顶向下的n项按操作数运算，再将运算的结果代替原栈顶的n项，压入栈S中 。如果后缀表达式未读完，则重复上面过程，最后输出栈顶的数值则为结束。

**简而言之：**

1. 从左到右读表达式
2. 遇到操作数压入栈中
3. 遇到操作符取并弹出栈顶n个元素，（n取决于操作符是n元操作符），计算结果压入栈中
4. 后缀表达式读完，当前栈顶元素及为结果
