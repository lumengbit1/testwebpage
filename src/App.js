import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Tree } from 'antd';
import { Modal, Button } from 'antd';


const TreeNode = Tree.TreeNode;
const url = "http://127.0.0.1:3000/structure/";
const inputtext='Please enter the value of the tree node!'


class App extends Component {
    constructor(){
        super();

        this.state={
            treeData: [],
            treeKey:[],
            ModalText: 'Content of the modal dialog',
            editvisible: false,
            NodeTreeItem: null,
            modalinput:'Please enter the value of the tree node!',
            ekey:null,
            addvisible:null,

        }
    };
     async componentDidMount(){

         let response = await fetch(url);
        let lastGist = await response.json();
        let temdata = this.state.treeData;
      //  let alldata = this.state.allData;
      //  console.log(lastGist.structure.level)

            let i = 0;
            for (let index of lastGist) {
                if (index.level==="0"){
                    temdata[i] = index;
                }

                i++;
            }

            this.setState({treeData: temdata});




    }
    onSelect = (info) => {
        //console.log('selected', info);
        this.setState({treeKey:info});
     //   console.log(this.state.treeKey)
    }
    onLoadData = async(treeNode) => {

   //     let response = await fetch('./treeListData.json');
        let response = await fetch(url);
        let lastGist = await response.json();
        const treeData = [...this.state.treeData];
        const arr = [];
        let level;
     //   console.log(treeNode.props.eventKey)
        for(let index of lastGist) {
        //    let num = index.replace(/[^0-9]/ig,"");
    //      console.log(`${lastGist.index.name}`)
            let num = Number(index.level);
            level = num;
            if(num>level){
                level = num;
            }


            if(treeNode.props.eventKey.length+1==index.key.length&&treeNode.props.eventKey==index.pid){
                arr.push({name:index.name,key:index.key})
            };



       //     console.log(index)
        }


   //     console.log(arr)

        this.getNewTreeData(treeData, treeNode.props.eventKey, arr, level);
     //   console.log(treeData)
        this.setState({treeData: treeData });


    }


    setLeaf=(treeData, curKey, level) =>{
        const loopLeaf = (data, lev) => {
            const l = lev - 1;
            data.forEach((item) => {
                   if ((item.key.length > curKey.length) ? item.key.indexOf(curKey) !== 0 :
                    curKey.indexOf(item.key) !== 0) {
                    return;
                }
                if (item.children) {
                    loopLeaf(item.children, l);
                } else if (l < 1) {
                    item.isLeaf = true;
                }
            });
        };
        loopLeaf(treeData, level + 1);
    }

    getNewTreeData=(treeData, curKey, child, level)=> {
        const loop = (data) => {
            if (level < 1 || curKey.length - 3 > level * 2) return;
            data.forEach((item) => {
                if (curKey.indexOf(item.key) === 0) {
                    if (item.children) {
                        loop(item.children);
                    } else {
                        item.children = child;
                    }
                }
            });
        };
        loop(treeData);
        console.log(treeData)
        this.setLeaf(treeData, curKey, level);
    }


    onEdit(){
         if(this.state.treeKey.length===0){
             alert("Please Choose Treenode First!");
             return;
         }

    }
    onMouseEnter = (e) => {
         if(e.node.props.eventKey==='00'){

            return;
         }
        var x = e.event.currentTarget.offsetLeft + e.event.currentTarget.clientWidth;
        var y = e.event.currentTarget.offsetTop ;
        this.setState({
            NodeTreeItem: {
                pageX: x,
                pageY: y,
                id: e.node.props.eventKey,
            },
            ekey:e.node.props.eventKey
        });
    }
    getNodeTreeMenu() {
        const {pageX, pageY} = {...this.state.NodeTreeItem};
        const tmpStyle = {
            position: 'absolute',
            maxHeight: 40,
            textAlign: 'center',
            left: `${pageX + 10}px`,
            top: `${pageY}px`,
            display: 'flex',
            flexDirection: 'row',
        };
        const menu = (
            <div
                style={tmpStyle}
            >
                <div style={{alignSelf: 'center', marginLeft: 10}} >
                    <Button type="primary" onClick={this.handleAddSub}>Edit</Button>
                </div>
                <div style={{alignSelf: 'center', marginLeft: 10}} >
                    <Button type="primary" onClick={this.handleEditSub}>Add</Button>
                </div>
                <div style={{alignSelf: 'center', marginLeft: 10}} >
                    <Button type="primary" onClick={this.handleDeleteSub}>Delete</Button>
                </div>
            </div>
        );
        return (this.state.NodeTreeItem == null) ? '' : menu;
    }

    handleAddSub = (e) => {
        console.log("click add id :", this.state.NodeTreeItem.id)
        this.showeditModal()
    }

    handleEditSub = (e) => {
        console.log("click edit id :", this.state.NodeTreeItem.id)
        this.showaddModal()
    }

    handleDeleteSub = (e) => {
        console.log("click delete id :", this.state.NodeTreeItem.id)
    }
    clearMenu = () => {
        this.setState({
            NodeTreeItem: null
        })
    }

    showeditModal = () => {

        this.setState({
            editvisible: true,
        });

    }
    handleeditOk = () => {
        this.setState({
           // ModalText: 'The modal dialog will be closed after two seconds',
            confirmLoading: true,
        });
       /* setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);*/

        this.submitData();
        this.setState({
            editvisible: false,
            confirmLoading: false,
            modalinput:inputtext,
        });

    }

    handleeditCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            editvisible: false,
            modalinput:inputtext,
        });
    }
    handleChange = (event) =>{
        this.setState({modalinput:event.target.value})
    }

    handleMouseEnter = ()=>{
         this.setState({modalinput:''})
    }

     submitData = async()=>{
   //      let formData = new FormData();
         let newurl= url+this.state.ekey;

    //     formData.append('name',this.state.modalinput);

    //     console.log(formData)

         let response =  await fetch(newurl,{
             method: 'PATCH',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({name:this.state.modalinput})

         });
         let res  = await response;
         if(res.ok){
            console.log('Success!')
         }else if(res.status==='400'){
            console.log('Failed!')
         }

    }


    showaddModal = () => {

        this.setState({
            addvisible: true,
        });

    }
    handleaddOk = () => {
        this.setState({
            // ModalText: 'The modal dialog will be closed after two seconds',
            confirmLoading: true,
        });
        /* setTimeout(() => {
             this.setState({
                 visible: false,
                 confirmLoading: false,
             });
         }, 2000);*/

        this.submitData();
        this.setState({
            addvisible: false,
            confirmLoading: false,
            modalinput:inputtext,
        });

    }

    handleeditCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            addvisible: false,
            modalinput:inputtext,
        });
    }
    handleChange = (event) =>{
        this.setState({modalinput:event.target.value})
    }

    handleMouseEnter = ()=>{
        this.setState({modalinput:''})
    }

    submitData = async()=>{
        //      let formData = new FormData();
        let newurl= url+this.state.ekey;

        //     formData.append('name',this.state.modalinput);

        //     console.log(formData)

        let response =  await fetch(newurl,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:this.state.modalinput})

        });
        let res  = await response;
        if(res.ok){
            console.log('Success!')
        }else if(res.status==='400'){
            console.log('Failed!')
        }

    }



  render() {

          const loop = data => data.map((item) => {
          if (item.children) {
          return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
      }
          return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'} />;
      });
          const treeNodes = loop(this.state.treeData);

          return (
          <div>
              <div onMouseLeave={this.clearMenu}>
          <Tree ref='Itree' onSelect={this.onSelect} loadData={this.onLoadData} onMouseEnter={this.onMouseEnter}>
              {treeNodes}
          </Tree>
                  {this.state.NodeTreeItem != null ? this.getNodeTreeMenu() :""}
              </div>
              <div>
                  <Button type="primary" onClick={this.onEdit.bind(this)}>Edit</Button>

              </div>
              <div>
                  <Modal title="Title of the modal dialog"
                         visible={this.state.editvisible}
                         onOk={this.handleeditOk}
                         confirmLoading={this.state.confirmLoading}
                         onCancel={this.handleeditCancel}

                  >
                      <p>Please enter the new name of the tree node.</p>
                      <input type='text' className='modalinput' value={this.state.modalinput} onChange={this.handleChange} onFocus={this.handleMouseEnter}/>
                  </Modal>
              </div>

              <div>
                  <Modal title="Title of the modal dialog"
                         visible={this.state.addvisible}
                         onOk={this.handleaddOk}
                         confirmLoading={this.state.confirmLoading}
                         onCancel={this.handleaddCancel}

                  >
                      <p>Please enter the new name of the tree node.</p>
                      <input type='text' className='modalinput' value={this.state.modalinput} onChange={this.handleChange} onFocus={this.handleMouseEnter}/>
                  </Modal>
              </div>
          </div>


          );


  }
}

export default App;
