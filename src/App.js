import React, { Component } from 'react';

import './App.css';
import ITree from './Tree';
import ISlide from './Slider'
import {Row,Col} from 'react-bootstrap';
import { Layout, Menu,Input,Icon, BackTop} from 'antd';

import IOrganizationPage from './OrganizationPage';
import IHomePage from './HomePage';
import IAboutUs from './Aboutus';

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
            current:null,
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
    navSwitchpage =()=>{
        switch(this.state.current){
            case '1':
                return <IAboutUs/>
                break;
            case '2':
                return <IOrganizationPage/>
                break;
            default:
                //return <img alt='home' style={{width:'100%'}} src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530698413239&di=a57edb1642269900e0d8517e527b5dc3&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fnature%2FApple_OSX_Mountain_Lion_Secret_Wallpapers%2Fwallpapers%2F3200x2000%2FCosmos02.jpg'/>
                return <IHomePage/>
                break;
        }
    }
    handleNavclick=(e)=>{
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    handleLogoclick=()=>{
        //return <img alt='home' style={{width:'100%'}} src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1530698413239&di=a57edb1642269900e0d8517e527b5dc3&imgtype=0&src=http%3A%2F%2Fwww.wallcoo.com%2Fnature%2FApple_OSX_Mountain_Lion_Secret_Wallpapers%2Fwallpapers%2F3200x2000%2FCosmos02.jpg'/>
         this.setState({current:null})
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

                          <div className="logo" ><img onClick={this.handleLogoclick} alt='LOGO'/></div>
                          <Menu
                              theme="dark"
                              mode="horizontal"
                              //defaultSelectedKeys={['2']}
                              style={{ lineHeight: '64px' }}
                              onClick={this.handleNavclick}
                              selectedKeys={[this.state.current]}
                          >
                              <Menu.Item key="1">About us</Menu.Item>
                              <Menu.Item key="2">Organization</Menu.Item>
                              <SubMenu title={<span>Services</span>}>
                                  <MenuItemGroup title="Softwware" >
                                      <Menu.Item key="setting:1">Service 1</Menu.Item>
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
                          {/*<Breadcrumb style={{ margin: '12px 0' }}>*/}
                              {/*<Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                              {/*<Breadcrumb.Item>List</Breadcrumb.Item>*/}
                              {/*<Breadcrumb.Item>App</Breadcrumb.Item>*/}
                          {/*</Breadcrumb>*/}
                          {/*<IOrganizationPage/>*/}
                          {/*<IHomePage/>*/}
                          {this.navSwitchpage()}



                          {/*<div>*/}
                              {/*<Row className="content">*/}
                                  {/*<Col className='treecol' md={2} >*/}
                                      {/*<ITree handleTreeselect={this.handleTreeselect}/>*/}
                                  {/*</Col>*/}
                                  {/*<Col className='centre' md={8}>*/}
                                      {/*{this.state.page}*/}
                                  {/*</Col>*/}
                                  {/*<Col className='right' md={2}>*/}
                                      {/*<br/>*/}
                                      {/*<div ref='login'>*/}
                                          {/*<div>*/}
                                              {/*<Input*/}
                                                  {/*ref='user'*/}
                                                  {/*placeholder="Enter your username"*/}
                                                  {/*prefix={<Icon type="user" />}*/}
                                                  {/*suffix={suffixuser}*/}
                                                  {/*value={logtext}*/}
                                                  {/*onChange={this.onChangeUserName}*/}
                                                  {/*ref={node => this.userNameInput = node}*/}
                                                  {/*onPressEnter={this.handleClick}*/}
                                              {/*/>*/}
                                          {/*</div>*/}
                                          {/*<div>*/}
                                              {/*/!*<label htmlFor='password' style={{width:80}}>Password:</label>*!/*/}
                                              {/*/!*<input type='password' id='password'  placeholder={this.state.logpassword} onChange={this.handleChangepassword} />*!/*/}
                                              {/*<Input*/}
                                                  {/*placeholder="Enter your password"*/}
                                                  {/*prefix={<Icon type="lock" />}*/}
                                                  {/*suffix={suffixpassword}*/}
                                                  {/*value={logpassword}*/}
                                                  {/*onChange={this.onChangePassword}*/}
                                                  {/*ref={node => this.passWordInput = node}*/}
                                                  {/*onPressEnter={this.handleClick}*/}
                                              {/*/>*/}
                                          {/*</div>*/}
                                      {/*</div>*/}
                                      {/*<div ref='logout' style={{display:'none'}}>*/}
                                        {/*<h4> Welcome,{this.state.logtext}</h4>*/}
                                      {/*</div>*/}
                                      {/*<br/>*/}
                                      {/*<div align="center">*/}
                                          {/*/!*<Button >Login</Button>*!/*/}
                                          {/*<input type="button" id="btn1" value={this.state.buttontext} onClick={this.handleClick}/>*/}
                                      {/*</div>*/}

                                  {/*</Col>*/}
                              {/*</Row>*/}
                          {/*</div>*/}
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
