import React,{useState} from 'react'
import Select from 'react-dropdown-select';
import {categories} from './categories';
import {Button,Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [selectList,setSelectList] = useState([])

    const clickSelectAll = (e) => {
        const {checked} = e.target;
        const list = selectList.map(categorie => {
            var isChecked = false;
            if(checked) {
                isChecked = true
            }
            categorie.isChecked = isChecked
            return categorie
        })
        setSelectList(list)
    }

    const clickSelect = (id) => {
        const dd = selectList.map((categorie) => {
            if(categorie.id === id) {
                if(categorie.isChecked) {
                    categorie.isChecked = false
                } else {
                    categorie.isChecked = true
                }
            } return categorie
        })
        setSelectList(dd)
    }

    const clickRemove = (id) => {
        let afterList = selectList.filter((categorie) => categorie.id !== id);
        setSelectList(afterList)
    }

    const clickRemoveSelected = () => {
        let afterList = selectList.filter((categorie) => categorie.isChecked !== true);
        setSelectList(afterList)
    }

    return (
        <div className="App">
            <div className="container">
                <div className="col-md-6">
                    <Select
                        multi
                        options={categories}
                        onChange={(values) => setSelectList(values)}
                        labelField="name"
                        valueField="id"
                        searchable={true}
                        searchBy="name"
                        values={selectList}
                    />

                </div>
                {selectList.length > 0 &&
                    <div className="container">
                        <div className="row">
                            <div className="selectall-row">
                                <div className="select-checkbox">
                                    <Form.Check
                                        type="checkbox"
                                        id="select-all"
                                        className="mr-4"
                                        inline
                                        onChange={(e) => clickSelectAll(e)}
                                    />

                                    <label className="custom-control-label mr-4" htmlFor={`select-all`}>Select All</label>
                                </div>
                                <Button variant="danger" className="mb-2" onClick={() => clickRemoveSelected()}>Remove</Button>
                            </div>
                            <div className="col-12">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Select</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Categorie</th>
                                            <th scope="col">Words</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectList.length > 0 && selectList.map((item,key) => {
                                            return (
                                                <tr key={key} className="text-center">
                                                    <td>
                                                        <div className="custom-control custom-checkbox">
                                                            <Form.Check
                                                                type="checkbox"
                                                                id={`custom-${ item.id }`}
                                                                className="mr-4"
                                                                inline
                                                                onChange={() => clickSelect(item.id)}
                                                                checked={item.isChecked}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>{item.Category}</td>
                                                    <td>913</td>
                                                    <td><Button variant="danger" onClick={() => clickRemove(item.id)}>Remove</Button></td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default App;
