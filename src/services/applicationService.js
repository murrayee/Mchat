import axios from '../config/instance'
import {ctsApi} from '../config/api'
const data=[

    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'美纶购',
        url:'http://web.meilungo.com/',
        path:'webApp'
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'Mercku',
        url:'http://10.70.103.212:8080',
        path:'webApp'
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'Cnode',
        url:'https://cnodejs.org/',
        path:'webApp'
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
    {
        icon: 'https://os.alipayobjects.com/rmsportal/IptWdCkrtkAUfjE.png',
        text:'组件',
        path:'componentExample',
        url:'',
    },
]


export const fetchGridList = async () => {

    return new Promise(function (resolve, reject) {
        resolve(data)
    })
}