
        /**
         * [定义数据类型,通过后面函数中进行指定判断:例如:DataType.text]
         * @param  {Object} DataType [参数的数据类型]
         */
        (function (DataType) {
            DataType[DataType["text"] = 0] = "text";
            DataType[DataType["int"] = 1] = "int";
            DataType[DataType["float"] = 2] = "float";
            DataType[DataType["checked"] = 3] = "checked";
            DataType[DataType["date"] = 4] = "date";
            DataType[DataType["time"] = 5] = "time";
            DataType[DataType["datetime"] = 6] = "datetime";
            DataType[DataType["namevalue"] = 7] = "namevalue";

        })(ui.DataType || (ui.DataType = {}));
        var DataType = ui.DataType;
        /**
         * [定义控件类型，判断控件的分类,通过后面函数中进行指定判断:例如:edit_type=0]
         * @param  {Object} EditType [判断控件分类：0为简单类型(simple),1为自动完成(autoComplete),2为下拉列表(dropdownList)]
         */
        (function (EditType) {
            EditType[EditType["simple"] = 0] = "simple";
            EditType[EditType["autoComplete"] = 1] = "autoComplete";
            EditType[EditType["dropdownList"] = 2] = "dropdownList"; //下拉列表，只允许下拉选择，不允许自由输入
        })(ui.EditType || (ui.EditType = {}));
        var EditType = ui.EditType;
        var edit = (function () {
            /**
             * [edit 根据控件的分类值和控件的数据属性值判断并创建对应的控件]
             * @param  {Element} parent [传入的父节点]
             * @param  {Object} option [传入的属性值]
             * @constructor
             */
            function edit(parent, option) {
                this.option = option;
                var selfWidget = this;
                //text类型
                if (option.data_type == DataType.text && option.edit_type == 0) {
                    var input = document.createElement("input");
                    if (option.Placeholder)
                        input.placeholder = option.Placeholder;
                    if (option.default_Value)
                        input.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(input);
                    }
                    else
                        parent.appendChild(input);
                    this.MaskTextBox = new kendo.ui.MaskedTextBox(input, {
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //int类型
                if (option.data_type == DataType.int && option.edit_type == 0) {
                    //NumericTextBox
                    var numericTextBox = document.createElement("input");
                    if (option.Placeholder)
                        numericTextBox.placeholder = option.Placeholder;
                    if (option.default_Value)
                        numericTextBox.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(numericTextBox);
                    }
                    else
                        parent.appendChild(numericTextBox);
                    this.NumericTextBox = new kendo.ui.NumericTextBox(numericTextBox, {
                        change: function (e) {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //float
                if (option.data_type == DataType.float && option.edit_type == 0) {
                    var numericTextBox = document.createElement("input");
                    if (option.Placeholder)
                        numericTextBox.placeholder = option.Placeholder;
                    if (option.default_Value)
                        numericTextBox.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(numericTextBox);
                    }
                    else
                        parent.appendChild(numericTextBox);
                    this.NumericFloat = new kendo.ui.NumericTextBox(numericTextBox, {
                        step: 0.01,
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //checkbox
                if (option.data_type == DataType.checked && option.edit_type == 0) {
                    this.Checkbox = document.createElement("input");
                    this.Checkbox.type = "checkbox";
                    this.Checkbox.className = "checkbox";
                    this.Checkbox.style.width = 22 + "px";
                    this.Checkbox.style.height = 22 + "px";
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(this.Checkbox);
                    }
                    else
                        parent.appendChild(this.Checkbox);
                    if (option.onChange) {
                        $(".checkbox").eq(0).click(function () {
                            option.onChange(selfWidget);
                        });
                    }
                }
                //date
                if (option.data_type == DataType.date && option.edit_type == 0) {
                    var datePicker = document.createElement("input");
                    if (option.Placeholder)
                        datePicker.placeholder = option.Placeholder;
                    if (option.default_Value)
                        datePicker.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(datePicker);
                    }
                    else
                        parent.appendChild(datePicker);
                    this.DatePicker = new kendo.ui.DatePicker(datePicker, {
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //time
                if (option.data_type == DataType.time && option.edit_type == 0) {
                    //TimePicker
                    var timePcker = document.createElement("input");
                    if (option.Placeholder)
                        timePcker.placeholder = option.Placeholder;
                    if (option.default_Value)
                        timePcker.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(timePcker);
                    }
                    else
                        parent.appendChild(timePcker);
                    this.TimePicker = new kendo.ui.TimePicker(timePcker, {
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //datetime 
                if (option.data_type == DataType.datetime && option.edit_type == 0) {
                    var dateTimePicker = document.createElement("input");
                    if (option.Placeholder)
                        dateTimePicker.placeholder = option.Placeholder;
                    if (option.default_Value)
                        dateTimePicker.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(dateTimePicker);
                    }
                    else
                        parent.appendChild(dateTimePicker);
                    this.DateTimePicker = new kendo.ui.DateTimePicker(dateTimePicker, {
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                            else {
                                if (option.hint)
                                    alert(option.hint);
                            }
                        }
                    });
                }
                //自动完成text类型控件 单选可以手动输入
                if (option.data_type == DataType.text && option.edit_type == 1) {
                    var that_1 = this;
                    var autoComplete = document.createElement("input");
                    if (option.Placeholder)
                        autoComplete.placeholder = option.Placeholder;
                    if (option.default_Value)
                        autoComplete.value = option.default_Value;
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(autoComplete);
                    }
                    else
                        parent.appendChild(autoComplete);
                    this.AutoComplete = new kendo.ui.AutoComplete(autoComplete, {
                        dataSource: option.ItemList,
                        dataTextField: "name",
                        change: function (e) {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                        },
                        select: function (e) {
                            that_1.selectVal = e.item.text();
                            if (option.onSelected) {
                                option.onSelected(selfWidget);
                            }
                        }
                    });
                }
                //多选namevalue类型   --------dropdownList属性,根据属性多选
                if (option.data_type == DataType.namevalue && option.edit_type == 2 && option.multi_select == true) {
                    var that_2 = this;
                    var multiSelect = document.createElement("input");
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(multiSelect);
                    }
                    else
                        parent.appendChild(multiSelect);
                    this.MultiSelect = new kendo.ui.MultiSelect(multiSelect, {
                        dataSource: option.ItemList,
                        dataTextField: "name",
                        dataValueField: "value",
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                        },
                        select: function (e) {
                            that_2.selectVal = e.item.text();
                            if (option.onSelected) {
                                option.onSelected(selfWidget);
                            }
                        }
                    });
                }
                //dropdownList    namevalue类型    单选类型
                if (option.data_type == DataType.namevalue && option.edit_type == 2 && option.multi_select == false) {
                    var that_3 = this;
                    var dropdownList = document.createElement("input");
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(dropdownList);
                    }
                    else
                        parent.appendChild(dropdownList);
                    this.DropDownList = new kendo.ui.DropDownList(dropdownList, {
                        dataSource: option.ItemList,
                        dataTextField: "name",
                        dataValueField: "value",
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                        },
                        select: function (e) {
                            that_3.selectVal = e.item.text();
                            if (option.onSelected) {
                                option.onSelected(selfWidget);
                            }
                        }
                    });
                }
                //text数据类型的  dropdownList控件   单选
                if (option.data_type == DataType.text && option.edit_type == 2 && option.multi_select == false) {
                    var that_4 = this;
                    var dropdownList = document.createElement("input");
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(dropdownList);
                    }
                    else
                        parent.appendChild(dropdownList);
                    this.DropDownList = new kendo.ui.DropDownList(dropdownList, {
                        dataSource: option.ItemList,
                        dataTextField: "name",
                        dataValueField: "value",
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                        },
                        select: function (e) {
                            that_4.selectVal = e.item.text();
                            if (option.onSelected) {
                                option.onSelected(selfWidget);
                            }
                        }
                    });
                }
                //text数据类型的 dropdownList控件 多选
                if (option.data_type == DataType.text && option.edit_type == 2 && option.multi_select == true) {
                    var that_5 = this;
                    var multiSelect = document.createElement("input");
                    if (option.hint) {
                        parent.innerHTML = "<abbr title=" + option.hint + ">" + "</abbr>";
                        $("abbr").append(multiSelect);
                    }
                    else
                        parent.appendChild(multiSelect);
                    this.MultiSelect = new kendo.ui.MultiSelect(multiSelect, {
                        dataSource: option.ItemList,
                        dataTextField: "name",
                        dataValueField: "value",
                        change: function () {
                            if (option.onChange) {
                                option.onChange(selfWidget);
                            }
                        },
                        select: function (e) {
                            that_5.selectVal = e.item.text();
                            if (option.onSelected) {
                                option.onSelected(selfWidget);
                            }
                        }
                    });
                }
            }
    
            edit.prototype.TextOnChange = function (change) {
            };
            /**
             * 获取值,单选，返回选中项，多选返回一个数组
             */
            edit.prototype.getValue = function () {
                //simple类型    text数据类型
                if (this.option.data_type == DataType.text && this.option.edit_type == 1) {
                    var value = this.AutoComplete.value();
                    var dataSource = this.option.ItemList;
                    var val = void 0;
                    for (var index = 0; index < dataSource.length; index++) {
                        if (value == dataSource[index].name) {
                            val = dataSource[index].value;
                        }
                    }
                    return val;
                }
                //dropdownList类型   text数据类型   多选返回数组
                if (this.option.data_type == DataType.text && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var value = this.MultiSelect.value();
                    return value;
                }
                //dropdownList类型   text数据类型   单选返回单个值
                if (this.option.data_type == DataType.text && this.option.edit_type == 2 && this.option.multi_select == false) {
                    return this.DropDownList.value();
                }
                //dropdownList   name_value数据类型   多选返回名称值对对象数组
                if (this.option.data_type == DataType.namevalue && this.option.edit_type == 2 && this.option.multi_select == true) {
                    return this.MultiSelect.value();
                }
                //dropdownList类型   name_value数据类型  返回单个名称值对对象
                if (this.option.data_type == DataType.namevalue && this.option.edit_type == 2 && this.option.multi_select == false) {
                    var value = this.DropDownList.text();
                    var data = this.option.ItemList;
                    var nv = void 0;
                    for (var i = 0; i < data.length; i++) {
                        if (value == data[i].name) {
                            nv = data[i];
                        }
                    }
                    return nv;
                }
            };
            /**
             * 返回显示在编辑框中的文本,即名称
             */
            edit.prototype.getText = function () {
                //text类型
                if (this.option.data_type == DataType.text && this.option.edit_type == 0) {
                    var text = this.MaskTextBox.value();
                    return text;
                }
                //int类型
                if (this.option.data_type == DataType.int && this.option.edit_type == 0) {
                    var text = this.NumericTextBox.value();
                    return text.toString();
                }
                //float类型
                if (this.option.data_type == DataType.float && this.option.edit_type == 0) {
                    var text = this.NumericFloat.value();
                    return text.toString();
                }
                //time 类型
                if (this.option.data_type == DataType.time && this.option.edit_type == 0) {
                    var text = this.TimePicker.value();
                    return text.toString();
                }
                //date 类型
                if (this.option.data_type == DataType.date && this.option.edit_type == 0) {
                    var text = this.DatePicker.value();
                    return text.toString();
                }
                //datetime 类型
                if (this.option.data_type == DataType.datetime && this.option.edit_type == 0) {
                    var text = this.DateTimePicker.value();
                    return text.toString();
                }
                //自动完成
                if (this.option.data_type == DataType.text && this.option.edit_type == 1) {
                    var text = this.AutoComplete.value();
                    return text;
                }
                //DropDownList   返回文本字符串   文本类型单个
                if (this.option.data_type == DataType.text && this.option.edit_type == 2 && this.option.multi_select == false) {
                    var text = this.DropDownList.text();
                    return text;
                }
                //DropDownList  返回键值对字符串   
                if (this.option.data_type == DataType.namevalue && this.option.edit_type == 2 && this.option.multi_select == false) {
                    var text = this.DropDownList.text();
                    var dataSource_1 = this.option.ItemList;
                    for (var i = 0; i < dataSource_1.length; i++) {
                        if (text == dataSource_1[i].name)
                            this.Items = JSON.stringify(dataSource_1[i]);
                    }
                    return this.Items;
                }
                //DropDownList 多选返回拼接字符串
                if (this.option.data_type == DataType.text && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var value = this.MultiSelect.value();
                    var valueLen = value.length;
                    var dataSource = this.option.ItemList;
                    var dropStr = "";
                    for (var i = 0; i < valueLen; i++) {
                        for (var j = 0; j < dataSource.length; j++) {
                            if (value[i] == dataSource[j].value) {
                                if (this.option.multi_select_comma) {
                                    if (i == valueLen - 1) {
                                        dropStr += dataSource[j].name;
                                    }
                                    else {
                                        dropStr += dataSource[j].name + this.option.multi_select_comma;
                                    }
                                }
                            }
                        }
                    }
                    if (dropStr != "")
                        return dropStr;
                    else if (this.option.hint)
                        return this.option.hint;
                }
                //dropdownList类型    name_value数据类型    返回多个name_value类型的拼接字符串
                if (this.option.data_type == DataType.namevalue && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var value = this.MultiSelect.value();
                    var len = value.length;
                    var dataSource = this.option.ItemList;
                    this.Items = "";
                    for (var i = 0; i < len; i++) {
                        for (var j = 0; j < dataSource.length; j++) {
                            if (value[i] == dataSource[j].value) {
                                if (this.option.multi_select_comma) {
                                    if (i == len - 1)
                                        this.Items += JSON.stringify(dataSource[j]);
                                    else
                                        this.Items += JSON.stringify(dataSource[j]) + this.option.multi_select_comma;
                                }
                            }
                        }
                    }
                    if (this.Items != "")
                        return this.Items;
                    else if (this.option.hint)
                        alert(this.option.hint);
                }
            };
            /**
             * 列表
             */
            edit.prototype.getItems = function () {
                //name_value 类型    text文本类型返回string数组
                if (this.option.data_type == DataType.text && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var data = this.option.ItemList;
                    this.Items = [];
                    var value = this.MultiSelect.value();
                    var valueCount = value.length;
                    for (var i = 0; i < valueCount; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (value[i] == data[j].value) {
                                this.Items.push(data[j].name);
                            }
                        }
                    }
                    return this.Items;
                }
                //name_value   键值对类型   返回键值对数组类型  多选
                if (this.option.data_type == DataType.namevalue && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var data = this.option.ItemList;
                    var retA = [];
                    var value = this.MultiSelect.value();
                    var valueCount = value.length;
                    for (var i = 0; i < valueCount; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (value[i] == data[j].value) {
                                var selNv = (data[j]);
                                var nvFormate = { "name": selNv.name, "value": selNv.value };
                                retA.push(nvFormate);
                            }
                        }
                    }
                    return retA;
                }
            };
            /**
             * 获取当前列表项中的索引位置，从0开始
             */
            edit.prototype.getItemIndex = function () {
                //自动完成控件    单选下拉索引
                if (this.option.data_type == DataType.text && this.option.edit_type == 1) {
                    var text = this.AutoComplete.value();
                    if (this.option.onSelected) {
                        text = this.selectVal;
                    }
                    var data = this.option.ItemList;
                    for (var i = 0; i < data.length; i++) {
                        if (text == data[i].name) {
                            this.Index = i;
                        }
                    }
                    return this.Index;
                }
                //dropdownList控件   单选
                if ((this.option.data_type == DataType.text || DataType.namevalue) && this.option.edit_type == 2 && this.option.multi_select == false) {
                    this.Index = this.DropDownList.select();
                    var data = this.option.ItemList;
                    if (this.option.onSelected) {
                        var thatvalue = this.selectVal;
                        for (var t = 0; t < data.length; t++) {
                            if (thatvalue == data[t].name) {
                                this.Index = t;
                            }
                        }
                    }
                    return this.Index;
                }
            };
            /**
             * 获取多选选中列表项中的索引的数组
             */
            edit.prototype.getCheckedIndex = function () {
                //多选namevalue类型    返回数组类型的索引
                if ((this.option.data_type == DataType.namevalue || this.option.data_type == DataType.text) && this.option.edit_type == 2 && this.option.multi_select == true) {
                    var data = this.option.ItemList;
                    this.Index = [];
                    var value = this.MultiSelect.value();
                    var valueCount = value.length;
                    for (var i = 0; i < valueCount; i++) {
                        for (var j = 0; j < data.length; j++) {
                            if (value[i] == data[j].value) {
                                this.Index.push(j);
                            }
                        }
                    }
                    return this.Index;
                }
            };
            /**
             * 获取控件选中状态
             */
            edit.prototype.getIsChecked = function () 
            {
                var checkbox = this.Checkbox.checked;
                if (checkbox == true) {
                    return true;
                }
                else {
                    return false;
                }
            };
            return edit;
        });
     
        //创建DOM节点
        var createEdit = (function () 
        {
            function createEdit(parentEl) {
                parentEl.innerHTML = htmltemple;
                document.body.appendChild(parentEl);
            }
        });
