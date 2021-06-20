const log = console.log.bind(console)

const e = (selector) => document.querySelector(selector)

const es = (selector) => document.querySelectorAll(selector)

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}
class Slider {
    constructor(options) {
        this.element = options.element
        this.start = true
        this.time = 100
        this.shenTi = []
        this.shenTiTu = 'shenTiTu'
        this.key = 'none'
        this.MOGU = '0'
        this.FZcao = 20
        this.FZzhangAi = 160
        this.FZlei = 2
        this.blood = 3
        this.keyNumber = 6
        this.boomNumber = 6
        this.shouShang = true
        this.music = new Audio('music/森.mp3')
        this.musicdaoJu = new Audio('music/拾取道具.mp3')
        this.musicSuperStar = new Audio('music/无敌.mp3')
        this.edit = true
        this.superStarMode = false
        this.init()
    }

    suju() {
        let o = {
            起始Y坐标: (Math.floor(this.DX()[0] / 2)),
            起始X坐标: (Math.floor(this.DX()[1] / 2)),
            cell: es('.grid-cell'),
            container: e('.grid-container'),
        }
        return o
    }

    // time()

    newCell(container, html, suzi) {
        // log('container, html, suzi', container, html, suzi)
        let HTML = ``
        for (let i = 0; i < suzi; i++) {
            HTML += html
        }
        container.innerHTML = HTML
    }

    XHnewCell(container1, html1, suzi) {
        // log('container1, html1, suzi', container1, html1, suzi)
        for (let i = 0; i < container1.length; i++) {
            this.newCell(container1[i], html1, suzi)
        }
    }

    DX() {
        let DX = []
        let x = e('.DXX')
        let y = e('.DXY')
        DX[0] = Number(x.value)
        DX[1] = Number(y.value)
        // log('typeof DX[1]', (typeof DX[1]) === 'number')
        if ((typeof DX[1]) === 'number' && (typeof DX[0]) === 'number') {
            // console.log('cesi1',DX[1], DX[1] > 0,DX[0] > 0)
            if (DX[1] > 0 && DX[0] > 0) {
                // log('cesi2')
                DX[0] = Math.floor(DX[0])
                DX[1] = Math.floor(DX[1])
                return DX
            }
        }
        return [25, 25]
    }

    zobn1(e, j) {
        for (let i = 0; i < e.children.length; i++) {
            e.children[i].dataset.x = i + 1
            e.children[i].dataset.y = j + 1
        }
    }

    zobn() {
        log(this.suju().container)
        let row = this.suju().container.children
        for (let i = 0; i < row.length; i++) {
            row[i].dataset.o = i + 1
            this.zobn1(row[i], i)
        }
    }

    shetou() {
        let x = es('.grid-row')[this.suju().起始Y坐标]
        log('x', x)
        let y = x.children[this.suju().起始X坐标]
        // log('this.suju().起始X坐标', this.suju().起始X坐标)
        // log('y', y, 'y[0]', x[0])
        y.classList.add('tou')
        y.classList.add('shetou')
    }

    svJiSu(newSuZu) {
        let a = Number(e('.DXX').value)
        let b = Number(e('.DXY').value)
        let x = Math.floor(Math.random() * a + 1)
        let y = Math.floor(Math.random() * b + 1)
        let c = Math.floor(a)

        let PDcell1 = this.PDCell(x, y).classList.contains('tou')
        // let PDcell2 = this.PDCell(x, y).classList.contains('shenTiTu')
        // let PDcell3 = this.PDCell(x, y).classList.contains('cao')
        let PDcell4 = this.PDCell(x, y).classList.contains('mogu1')
        let PDcell5 = this.PDCell(x, y).classList.contains('mogu2')
        let PDcell6 = this.PDCell(x, y).classList.contains('mogu3')
        let PDcell7 = this.PDCell(x, y).classList.contains('zhangAi1')
        let PDcell8 = this.PDCell(x, y).classList.contains('zhangAi2')
        let PDcell9 = this.PDCell(x, y).classList.contains('zhangAi3')


        if (y === c || PDcell1 || PDcell4 || PDcell5 || PDcell6 || PDcell7 || PDcell8 || PDcell9) {
            return this.svJiSu(newSuZu)
        }
        if (y !== c) {
            // log('找到元素', x, y)
            for (let i = 0; i < newSuZu.length; i++) {
                let X = Number(newSuZu[i].dataset.x)
                let Y = Number(newSuZu[i].dataset.y)
                if (X === x && Y === y) {
                    // log('NEW找到元素', x, y)
                    return newSuZu[i]
                }
            }
        }
        return log('没找到元素')
    }

    gaiLv3(yrsu, ...agument) {
        let a = Math.random()
        // log('a', a)
        // log('yrsu', yrsu)
        if (a < 0.7) {
            yrsu.classList.add(agument[0])
        } else if (a >= 0.7 && a < 0.9) {
            yrsu.classList.add(agument[1])
        } else {
            yrsu.classList.add(agument[2])
        }
    }

    gaiLv(a, ...agument) {
        let length = agument.length
        if (length === 1) {
            a.classList.add(agument)
        } else if (length === 3) {
            this.gaiLv3(a, ...agument)
        }

    }

    fangZhiPD(...agument) {
        let newSuZu = []
        let cell = this.suju().cell
        for (let i = 0; i < cell.length; i++) {
            let PDA = cell[i].classList.contains('tou')
            // let PDB = cell[i].classList.contains('shenTiTu')
            let PDC = cell[i].classList.contains('zhangAi1')
            let PDD = cell[i].classList.contains('zhangAi2')
            let PDE = cell[i].classList.contains('zhangAi3')
            let PDF = cell[i].classList.contains('xiangjing1')
            let PDG = cell[i].classList.contains('xiangjing2')
            let PDH = cell[i].classList.contains('xiangjing3')
            let PDI = cell[i].classList.contains('key')
            let PDJ = cell[i].classList.contains('superStar')

            // let PDF = cell[i].classList.contains('cao')
            if (PDA || PDC || PDD || PDE || PDF || PDG || PDH || PDI || PDJ) {
                continue
            } else {
                newSuZu.push(cell[i])
            }
        }
        // log('newSuZu', newSuZu)
        let a = this.svJiSu(newSuZu)
        // log('a的值是', a)
        if (a === undefined) {
            this.fangZhiPD(...agument)
        } else {
            this.gaiLv(a, ...agument)
        }
    }

    mogu() {
        this.fangZhiPD('mogu1', 'mogu2', 'mogu3')
        this.fangZhiPD('mogu1', 'mogu2', 'mogu3')
        this.fangZhiPD('mogu1', 'mogu2', 'mogu3')
    }

    cao() {
        log('this.FZcao', Number(this.time))
        for (let i = 0; i < this.FZcao; i++) {
            this.fangZhiPD('cao', 'cao2', 'uvditu')
        }
    }

    zhangAi() {
        for (let i = 0; i < this.FZzhangAi; i++) {
            this.fangZhiPD('zhangAi1', 'zhangAi2', 'zhangAi3')
        }
    }

    lei() {
        for (let i = 0; i < this.FZlei; i++) {
            log('lei')
            this.fangZhiPD('boomSakaLaka')
        }
    }

    health() {
        this.fangZhiPD('blood')
    }

    xianJing() {
        this.fangZhiPD('xiangjing1')
        this.fangZhiPD('xiangjing2')
        this.fangZhiPD('xiangjing3')
        this.fangZhiPD('xiangjing1')
        this.fangZhiPD('xiangjing2')
        this.fangZhiPD('xiangjing3')
    }

    superStar() {
        this.fangZhiPD('superStar')
    }

    showKey() {
        this.fangZhiPD('key')
    }

    dituEdit() {
        this.mogu()
        this.cao()
        this.zhangAi()
        this.lei()
        this.health()
        this.xianJing()
        this.superStar()
        this.showKey()
    }

    DiTu(x) {
        let DX = this.DX()
        let html = `<div class="grid-row"></div>`
        let container = e('.grid-container')
        this.newCell(container, html, DX[1])

        let html1 = `<div class="grid-cell"></div>`
        let container1 = es('.grid-row')

        this.XHnewCell(container1, html1, DX[0])
        this.zobn()
        this.shetou()
        if (x === 1) {
            this.dituEdit()
        }
    }

    plusBlood(x = this.blood) {
        let health = e('.health')
        let html = '<div class="health-blood"></div>'
        // log('health.children', health.children)
        if (x === this.blood) {
            health.innerHTML = ""
        }
        for (let i = 0; i < x; i++) {
            log('jingru xue')
            health.insertAdjacentHTML('beforeend', html)
        }
    }

    newGamenow() {
        if (this.edit === false) {
            this.DiTu(1)
        } else if (this.edit === true) {
            this.DiTu(2)
        }
        this.start = true
        this.key = "none"
        this.shenTi = []
        this.MOGU = '0'
        e('.boom').innerHTML = this.boomNumber
        e('.keyNumeber').innerHTML = this.keyNumber
        this.plusBlood()
    }

    newGame() {
        this.newGamenow()
        let newGame = e('#restart')
        newGame.addEventListener('click', () => {
            log('this.edit', this.edit)
            this.newGamenow()
        })
    }

    PDCell(x, y) {
        for (let i = 0; i < this.suju().cell.length; i++) {
            let cell = this.suju().cell[i]
            if (Number(cell.dataset.x) === Number(x) && Number(cell.dataset.y) === Number(y)) {
                return cell
            }
        }
        return false
    }

    gameOver(x = 'stop') {
        let music1 = new Audio('music/受伤.mp3')
        let music2 = new Audio('music/死亡.mp3')

        if (this.shouShang) {
            if (x === 'stop') {
                clearInterval(this.intervalId1)
            }
            this.suju().container.classList.add('sakesake')
            setTimeout(() => {
                this.suju().container.classList.remove('sakesake')
            }, 2000)
            music1.play()
            let health = e('.health').children.length
            e('.health').children[health - 1].remove()
            log('health', health)
            if (health === 1) {
                music2.play()

                // alert('游戏结束')
                this.start = false
                setTimeout(() => {
                    alert('游戏结束')
                }, 3000)
            }
        }
    }

    gameWin() {
        clearInterval(this.intervalId1)
        alert('游戏胜利')
        this.start = false
        this.moguSuLiang = 0
    }

    PDshetou() {
        let x = e('.tou').dataset.x
        let y = e('.tou').dataset.y
        return [x, y]
    }

    PDmoGu(shetouNew) {
        let moguMusic = new Audio('music/拾取蘑菇.mp3')
        let mogu = ['mogu1', 'mogu2', 'mogu3']
        let Zscore = [100, 500 , 1000]
        let key = e('.keyNumeber')
        let keyNumeber = Number(key.innerHTML)
        for (let i = 0; i < mogu.length; i++) {
            let moguNew = mogu[i]
            // log('moguNew', moguNew)
            if (shetouNew.classList.contains(moguNew)) {
                if (mogu[i] === 'mogu2') {
                    log('ceui 进入1')
                    if (keyNumeber >= 1) {
                        log('ceui 进入2')
                        key.innerHTML = keyNumeber - 1
                        moguMusic.play()
                        shetouNew.classList.remove(mogu[i])
                        this.MOGU = '1'
                        let score = e('.score-container')
                        score.innerHTML = Number(score.innerHTML) + Zscore[i]
                        return true
                    } else {
                        return 1
                    }
                } else if (mogu[i] === 'mogu3') {
                    if (keyNumeber >= 3) {
                        key.innerHTML = keyNumeber - 3
                        moguMusic.play()
                        shetouNew.classList.remove(mogu[i])
                        this.MOGU = '1'
                        let score = e('.score-container')
                        score.innerHTML = Number(score.innerHTML) + Zscore[i]
                        return true
                    } else {
                        return 1
                    }
                } else if (mogu[i] === 'mogu1') {
                    log('mogu[i]', mogu[i])
                    log('mogu3333333')
                    moguMusic.play()
                    shetouNew.classList.remove(mogu[i])
                    this.MOGU = '1'
                    let score = e('.score-container')
                    score.innerHTML = Number(score.innerHTML) + Zscore[i]
                    return true
                }
            }
        }
    return false
}

    shenTiSuZi(oldShetou, shetouNew, suzi) {
        if (suzi === 0) {
            this.shenTi.push(shetouNew)
            this.shenTi.shift()
        } else if (suzi ===1) {
            this.shenTi.push(shetouNew)
        }
    }

    shenTiPush() {
        let cell = this.suju().cell
        let shenTiTu = this.shenTiTu
        for (let i = 0; i < cell.length; i++) {
            if (cell[i].classList.contains(shenTiTu)) {
                cell[i].classList.remove(shenTiTu)
            }
        }
        let shenti = this.shenTi
        for (let i = 0; i < shenti.length; i++) {
            shenti[i].classList.add(shenTiTu)
        }
    }

    PDlei(shetouNew) {
        if (shetouNew.classList.contains('boomSakaLaka')) {
            this.musicdaoJu.play()
            shetouNew.classList.remove('boomSakaLaka')
            e('.boom').innerHTML = Number(e('.boom').innerHTML) + 1
            this.fangZhiPD('boomSakaLaka',)
        }
    }

    PDblood(shetouNew) {
        let key = e('.keyNumeber')
        let keyNumeber = Number(key.innerHTML)
        let bloodMusic = new Audio('music/拾取补血.mp3')
        if (shetouNew.classList.contains('blood')) {
            if (keyNumeber >= 5) {
                shetouNew.classList.remove('blood')
                bloodMusic.play()
                this.plusBlood(1)
                this.fangZhiPD('blood')
                key.innerHTML = keyNumeber - 5
                return true
            } else {
                return false
            }
        }
    }

    PDxiangJing(shetouNew) {
        if (shetouNew.classList.contains('xiangjing1') || shetouNew.classList.contains('xiangjing2') || shetouNew.classList.contains('xiangjing3')) {
            this.gameOver()
        }
    }

    PDsuperStar(shetouNew) {
        if (this.superStarMode === false) {
            if (shetouNew.classList.contains('superStar')) {
                shetouNew.classList.remove('superStar')
                this.superStarMode === true
                this.shouShang = false
                let shenti = this.shenTiTu
                this.shenTiTu = 'superStar'
                for (let i = 0; i < this.suju().cell.length; i++) {
                    if (this.suju().cell[i].classList.contains('shenTiTu')) {
                        this.suju().cell[i].classList.remove('shenTiTu')
                    }
                    this.musicdaoJu.play()
                    this.musicSuperStar.play()
                    this.time = 50
                }
                setTimeout(() => {
                    for (let i = 0; i < this.suju().cell.length; i++) {
                        if (this.suju().cell[i].classList.contains('superStar')) {
                            this.suju().cell[i].classList.remove('superStar')
                        }
                    }
                    this.shenTiTu = shenti
                    this.shouShang = true
                    this.time = 100
                    this.superStarMode === false
                }, 30000)
                setTimeout(() => {
                    this.fangZhiPD('superStar')
                }, 60000)
            }
        }
    }

    PDKey(shetouNew) {
        if (shetouNew.classList.contains('key')) {
            this.musicdaoJu.play()
            shetouNew.classList.remove('key')
            e('.keyNumeber').innerHTML = Number(e('.keyNumeber').innerHTML) + 1
            // if (Number(e('.keyNumeber').innerHTML) < 3) {
            // }
            this.fangZhiPD('key')

        }
    }

    PDtoggle(oldShetou, shetouNew, mogu) {
        let jisu
        let name = oldShetou.className.split(' ')
        oldShetou.classList.remove('tou')
        shetouNew.classList.add('tou')
        // let mogu = this.PDmoGu(shetouNew)

        this.shenTiPush()
        log('mogu', mogu)
        if (mogu === true) {
            this.shenTiSuZi(oldShetou, shetouNew, 1)
            // this.moguSuLiang = Number(this.moguSuLiang) + 1
        } else if (mogu === false || mogu === undefined){
            this.shenTiSuZi(oldShetou, shetouNew, 0)
        }

        this.PDlei(shetouNew)
        // this.PDblood(shetouNew)
        this.PDxiangJing(shetouNew)
        this.PDsuperStar(shetouNew)
        this.PDKey(shetouNew)

        if (name.includes('shetou')) {
            oldShetou.classList.remove('shetou')
            jisu = '1'
        }
        if (name.includes('shetouMoveRight')) {
            oldShetou.classList.remove('shetouMoveRight')
            jisu = '2'
        }
        if (name.includes('shetouMoveLeft')) {
            oldShetou.classList.remove('shetouMoveLeft')
            jisu = '1'
        }
        if (name.includes('shetouMoveUp1')) {
            oldShetou.classList.remove('shetouMoveUp1')
            jisu = '1'
        }
        if (name.includes('shetouMoveUp2')) {
            oldShetou.classList.remove('shetouMoveUp2')
            jisu = '2'
        }
        if (name.includes('shetouMoveDown1')) {
            oldShetou.classList.remove('shetouMoveDown1')
            jisu = '1'
        }
        if (name.includes('shetouMoveDown2')) {
            oldShetou.classList.remove('shetouMoveDown2')
            jisu = '2'
        }
        // if (oldShetou.classList.contains('shenTi')) {
        //     // log('chenggong')
        //     oldShetou.classList.add('shenTiTu')
        // }
        // clearInterval(this.intervalId1)
        // log('this.MOGU', this.MOGU)
        if (this.MOGU === '1') {
            this.MOGU = '0'
            this.fangZhiPD('mogu1', 'mogu2', 'mogu3')
        }
        return jisu
    }

    win() {
        let cellPlus = this.suju().cell
        let cellLength = cellPlus.length
        let suzu = []
        let shenTiTu = this.shenTiTu
        for (let i = 0; i < cellPlus.length; i++) {
            let cell = cellPlus[i]
            let PD1 = cell.classList.contains('mogu1')
            let PD2 = cell.classList.contains('mogu2')
            let PD3 = cell.classList.contains('mogu3')
            let PD4 = cell.classList.contains('tou')
            let PD5 = cell.classList.contains(shenTiTu)

            if (PD1 || PD2 || PD3 || PD4 || PD5) {
                suzu.push(cell)
            }
        }
        // log('cellLength', cellLength)
        // log('suzu.length', suzu.length)
        if (cellLength === suzu.length) {
            return true
        }
        return false
    }

    keyBoom(shetouNew) {
        let a = Math.random()
        log('a', a)
        if (a < 0.1) {
            shetouNew.classList.add('key')
            e('.keyNumeber').innerHTML = Number(e('.keyNumeber').innerHTML) - 1
        }
    }

    PDzhangAi(shetouNew, boom) {
        let music = new Audio('music/嘣的一声.mp3')
        // let boom = Number(e('.boom').innerHTML)
        if (boom > 0) {
            // clearInterval(this.intervalId1)
            if (shetouNew.classList.contains('zhangAi1')) {
                shetouNew.classList.remove('zhangAi1')
                music.play()
            }
            if (shetouNew.classList.contains('zhangAi2')) {
                shetouNew.classList.remove('zhangAi2')
                music.play()
            }
            if (shetouNew.classList.contains('zhangAi3')) {
                shetouNew.classList.remove('zhangAi3')
                music.play()
            }
            e('.boom').innerHTML = Number(e('.boom').innerHTML) - 1
            this.keyBoom(shetouNew)
            return true

        } else if (boom === 0) {
            return false
        }
    }

    moveOK(argument, oldShetou, shetouNew, mogu) {
        if (argument.length === 1) {
            log('ceui111')
            this.PDtoggle(oldShetou, shetouNew, mogu)
            shetouNew.classList.add(argument[0])
        } else if (argument.length === 2) {
            log('ceui333')
            let b = this.PDtoggle(oldShetou, shetouNew, mogu)
            if (b === '1') {
                shetouNew.classList.add(argument[0])
            } else if (b === '2') {
                shetouNew.classList.add(argument[1])
            }
        }
    }

    moveNow(x, y,  ...argument) {
        let oldShetou = e('.tou')
        let shetouNew = this.PDCell(x, y)
        let win = this.win()
        if (win) {
            this.gameWin()
        } else if (shetouNew === false || shetouNew === false) {
            this.gameOver()
        } else {
            let boom = Number(e('.boom').innerHTML)

            let zhangAi1 = shetouNew.classList.contains('zhangAi1')
            let zhangAi2 = shetouNew.classList.contains('zhangAi2')
            let zhangAi3 = shetouNew.classList.contains('zhangAi3')
            let mogu1 = shetouNew.classList.contains('mogu1')
            let mogu2 = shetouNew.classList.contains('mogu2')
            let mogu3 = shetouNew.classList.contains('mogu3')
            let xiangjing1 = shetouNew.classList.contains('xiangjing1')
            let xiangjing2 = shetouNew.classList.contains('xiangjing2')
            let xiangjing3 = shetouNew.classList.contains('xiangjing3')


            let mogu = this.PDmoGu(shetouNew)
            let blood = this.PDblood(shetouNew)
            // log('blood', blood)
            // log('mogu !== false', mogu, mogu !== false)
            if (shetouNew.classList.contains('blood')) {
                log('chenggong2')
                if (blood === true) {
                    log('chenggong3')
                    this.moveOK(argument, oldShetou, shetouNew, mogu)
                } else {
                    log('blood = false')
                    clearInterval(this.intervalId1)
                }
            } else if (zhangAi1 || zhangAi2 || zhangAi3) {
                let zhangAi = this.PDzhangAi(shetouNew, boom)
                if (zhangAi === true) {
                    this.moveOK(argument, oldShetou, shetouNew, mogu)
                } else {
                    clearInterval(this.intervalId1)
                }
            } else if (mogu1 || mogu2 || mogu3) {
                if (mogu === true) {
                    log('2222222222222222')
                    this.moveOK(argument, oldShetou, shetouNew, mogu)
                } else if (mogu === 1) {
                    log('33333333333333333333')
                    clearInterval(this.intervalId1)
                }
            } else if (shetouNew.classList.contains('shenTiTu')) {
                this.gameOver()
            } else if (xiangjing1 || xiangjing2 || xiangjing3) {
                this.gameOver('dontStop')
            } else {
                this.moveOK(argument, oldShetou, shetouNew, mogu)
            }
        }
    }

    moveRight() {
        let x = this.PDshetou()[0]
        let y = this.PDshetou()[1]
        clearInterval(this.intervalId1)
        this.intervalId1 = setInterval(() => {
            x = Number(x) + 1
            this.moveNow(x, y, 'shetouMoveRight')
        }, this.time * 2)
    }

    moveLeft() {
        let x = this.PDshetou()[0]
        let y = this.PDshetou()[1]
        clearInterval(this.intervalId1)
        this.intervalId1 = setInterval(() => {
            x = Number(x) - 1
            this.moveNow(x, y, 'shetouMoveLeft')
        }, this.time * 2)
    }

    moveUp() {
        let x = this.PDshetou()[0]
        let y = this.PDshetou()[1]
        clearInterval(this.intervalId1)
        this.intervalId1 = setInterval(() => {
            y = Number(y) - 1
            this.moveNow(x, y, 'shetouMoveUp1', 'shetouMoveUp2')
        }, this.time * 2)
    }

    moveDown() {
        let x = this.PDshetou()[0]
        let y = this.PDshetou()[1]
        clearInterval(this.intervalId1)
        this.intervalId1 = setInterval(() => {
            y = Number(y) + 1
            this.moveNow(x, y, 'shetouMoveDown1', 'shetouMoveDown2')
        }, this.time * 2)
    }

    moveSXZY() {
        let zuo = e('.zuo')
        let shang = e('.shang')
        let xia = e('.xia')
        let you = e('.you')
        zuo.addEventListener('click', () => {
            if (this.key !== 'Right') {
                this.moveLeft()
                this.key = 'Left'
            }
        })
        shang.addEventListener('click', () => {
            if (this.key !== 'Down') {
                this.moveUp()
                this.key = 'Up'
            }
        })
        xia.addEventListener('click', () => {
            if (this.key !== 'Up') {
                this.moveDown()
                this.key = 'Down'
            }
        })
        you.addEventListener('click', () => {
            if (this.key !== 'Left') {
                // log('this.key !== left' , this.key !== 'Left')
                this.moveRight()
                this.key = 'Right'
            }
        })
    }

    move() {
        // log('this.start', this.start)
        addEventListener('keydown', (event) => {
            if (this.start) {
                // log('this.key', this.key)
                if (event.key === 'ArrowRight' && this.key !== 'Left') {
                    // log('this.key !== left' , this.key !== 'Left')
                    this.moveRight()
                    this.key = 'Right'
                }
                if (event.key === 'ArrowLeft' && this.key !== 'Right') {
                    this.moveLeft()
                    this.key = 'Left'
                }
                if (event.key === 'ArrowUp' && this.key !== 'Down') {
                    this.moveUp()
                    this.key = 'Up'
                }
                if (event.key === 'ArrowDown' && this.key !== 'Up') {
                    this.moveDown()
                    this.key = 'Down'
                }
            }
        })
        this.moveSXZY()

    }

    starGame() {
        log('ceui1')
        // // this.PDCell(x, y)
        // addEventListener('keydown', (event) => {
        //     // log(event)
        //     if (event.key === 'ArrowRight') {
        //     }
        // })
        this.move()
    }

    kb() {
        let ky = e('.xvkbmusic')
        ky.addEventListener('click', (event) => {
            ky.classList.toggle('kb')
            ky.classList.toggle('kbMove')
            if (ky.classList.contains('kb')) {
                // setInterval(() => {
                    this.music.pause()
                // }, 60000)
            }
            if (ky.classList.contains('kbMove')) {
                this.music.play()

            }
        })
    }

    mode() {
        if (this.edit === false) {
            this.DiTu(1)
        } else if (this.edit === true) {
            this.DiTu(2)
        }
        this.newGame()
        this.starGame()
    }


    gameMode() {
        let mode1 = e('#restart1')
        let mode2 = e('#restart2')
        mode1.addEventListener('click', () => {
            if (mode1.classList.contains('silver')) {
                this.edit = false
                mode1.classList.toggle('silver')
                mode2.classList.toggle('silver')
            }
        })
        mode2.addEventListener('click', () => {
            if (mode2.classList.contains('silver')) {
                this.edit = true
                mode1.classList.toggle('silver')
                mode2.classList.toggle('silver')
            }
        })
    }

    moyu() {
        let moyu = e('.moyumode')
        moyu.addEventListener('click', () => {
            if (e('html').style.filter === 'grayscale(100%)') {
                e('html').style.filter = ''
            } else {
                e('html').style.filter = 'grayscale(100%)'
            }

        })
    }


    init() {
        this.kb()
        this.gameMode()
        this.mode()
        this.moyu()
        log('ceui')
        log('this.FZcao', Number(this.FZcao))
        console.time('加载')
        console.timeEnd('加载')
        // log('起始 X, Y 坐标', this.suju().起始X坐标, this.suju().起始Y坐标)
    }
}
