import React, { Component } from 'react';

import './App.css';
import ITree from './Tree';
import ISlide from './Slider'
import {Row,Col} from 'react-bootstrap';
import { Layout, Menu,Input,Icon, BackTop} from 'antd';

import IOrganizationPage from './OrganizationPage';
import IHomePage from './HomePage';
import IAboutUs from './Aboutus';
import IStep from './Step';

import {Route,NavLink,Switch} from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Header, Content, Footer } = Layout;

const pagetext='Welcome Page'


class App extends Component {
    constructor() {
        super();
        this.state={
            treeselect:null,
            page:pagetext,
            buttontext:'Login',
            logtext:'',
            logpassword:'',
        }
    }

    handleTreeselect=(val)=>{
        console.log(val)
        this.setState({treeselect: val},()=>{this.changpage()});
     //   console.log(this.state.treeselect)

    }
    changpage = ()=>{
        if(this.state.treeselect=='001'){
            this.setState({page:'Introduce 1'})
        }else if(this.state.treeselect=='002'){
            this.setState({page:<ISlide/>})
        }
    }
    handleClick=()=>{
        if(this.state.logtext==='username'||this.state.logpassword==='password'){
            alert('Please enter Username and Password!');
            return;
        }
        if(this.state.buttontext==='Login'){
            this.setState({buttontext:'Logout'});
            this.refs.login.style.display='none';
            this.refs.logout.style.display='block';
        }else{
            this.setState({buttontext:'Login',logtext:'',logpassword:''});
            this.refs.login.style.display='block';
            this.refs.logout.style.display='none';
        }
    }

    handleChangepassword=(e)=>{
        this.setState({logpassword:e.target.value})
    }

    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ logtext: '' });
    }
    onChangeUserName = (e) => {
        this.setState({logtext:e.target.value})
    }
    passEmpty = () => {
        this.passWordInput.focus();
        this.setState({ logpassword: '' });
    }
    onChangePassword = (e) => {
        this.setState({logpassword:e.target.value})
    }


  render() {

          const { logtext,logpassword } = this.state;
          const suffixuser = logtext ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
          const suffixpassword = logpassword ? <Icon type="close-circle" onClick={this.passEmpty} /> : null;

          return (
              <div >
                  <div><img alt='banner' className='banner' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530204432503&di=0bfe2ca6f21aa2cba551afd3580a2b24&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fc995d143ad4bd1137c1d50b556afa40f4afb0560.jpg'/></div>
                  <Layout  className="layout">
                      <Header >

                          {/*<div ><img className="logo"  onClick={this.handleLogoclick} alt='LOGO' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531126100748&di=a238e78ae2eef8e2b9b06e703d68d20e&imgtype=0&src=http%3A%2F%2Fstatic.open-open.com%2Fnews%2FuploadImg%2F20141120%2F20141120123529_193.jpg'/></div>*/}
                          <div ><NavLink exact to='/'><img className="logo"  alt='LOGO' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531126100748&di=a238e78ae2eef8e2b9b06e703d68d20e&imgtype=0&src=http%3A%2F%2Fstatic.open-open.com%2Fnews%2FuploadImg%2F20141120%2F20141120123529_193.jpg'/></NavLink></div>
                          <Menu
                              theme="dark"
                              mode="horizontal"
                              //defaultSelectedKeys={['2']}
                              style={{ lineHeight: '64px' }}
                              // onClick={this.handleNavclick}
                              selectedKeys={[this.state.current]}
                          >
                              <Menu.Item key="1"><NavLink exact to='/aboutus'>About us</NavLink></Menu.Item>
                              <Menu.Item key="2"><NavLink exact to='/organization'>Organization</NavLink></Menu.Item>
                              <SubMenu title={<span>Services</span>}>
                                  <MenuItemGroup title="Softwware" >
                                      <Menu.Item key="setting:1"><NavLink exact to='/step'>Service 1</NavLink></Menu.Item>
                                      <Menu.Item key="setting:2">Service 2</Menu.Item>
                                  </MenuItemGroup>
                                  <MenuItemGroup title="Hardware">
                                      <Menu.Item key="setting:3">Service 3</Menu.Item>
                                      <Menu.Item key="setting:4">Service 4</Menu.Item>
                                  </MenuItemGroup>
                              </SubMenu>
                              <Menu.Item key="3">Contact us</Menu.Item>
                          </Menu>
                      </Header>
                      <Content style={{ padding: '0 50px'}}>
                            <Switch>
                                <Route exact path='/' component={IHomePage}/>
                                <Route exact path='/organization' component={IOrganizationPage}/>
                                <Route exact path='/aboutus' component={IAboutUs}/>
                                <Route exact path='/step' component={IStep}/>
                            </Switch>




                      </Content>
                      <Footer  style={{ textAlign: 'center' }}>
                          <div className='foot'>2018 Created by Meng Lu</div>

                      </Footer>
                  </Layout>

                  <div>
                      <BackTop />
                      Scroll down to see the bottom-right
                      <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
                      button.
                  </div>
              </div>

          )


  }
}

export default App;
