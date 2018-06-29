import React, { Component } from 'react';
import { Carousel } from 'antd';


class ISlide extends Component{

    render(){
        return(
           <div>
                <Carousel autoplay>
                    <div><img alt='1' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530084869855&di=7673214eff299d965ee4c62175e9d385&imgtype=0&src=http%3A%2F%2Fztd00.photos.bdimg.com%2Fztd%2Fw%3D350%3Bq%3D70%2Fsign%3Dfabb7a500324ab18e016e73205c197f0%2F37d3d539b6003af3925a43163f2ac65c1138b6e0.jpg'/></div>
                    <div><img alt='2' src='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3967424754,3551721784&fm=27&gp=0.jpg'/></div>
                    <div><img alt='3' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530680064&di=102dbafa70bb093b6fb7a2548864230b&imgtype=jpg&er=1&src=http%3A%2F%2Fupload.hqrw.com.cn%2F2017%2F0620%2F1497923962420.jpg'/> </div>
                    <div><img alt='4' src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1433374083,3830339464&fm=11&gp=0.jpg'/></div>
                </Carousel>
            </div>


        )
    }
}

export default ISlide;