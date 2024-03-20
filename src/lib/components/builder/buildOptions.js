import { Input } from "../input";


import BUILDER_COMPONENTS from "@components";

export function BuildOptions({ options, data, update, functions }) {
  if (Array.isArray(options)) {
    return (
      <div className="p-2">
        {options.map((item, index) => {
          if (item.type == "select") {
            return (
              <div key={index} className="w-[300px] m-auto">
                <Input
                  variant="builder"
                  label={item.value}
                  value={data[item.value]}
                  type="select"
                  options={function(){
                    switch(item.options){
                        case "functions":
                            return Object.keys(functions).map(name=>({ value: name, label: name }));
                        case"components":
                        return Object.keys(BUILDER_COMPONENTS).map(name=>({ value: name, label: name }));
                      
                            default:
                            return item.options
                    }
                  }()
                  }
                  onChange={dataIn => {
                    let newData = { ...data };
                    newData[item.value] = dataIn;
                    update(newData);
                  }}
                />
              </div>
            );
          }
          if (item.type == "select-boolean") {
            return (
              <div key={index} className="w-[300px] m-auto">
                <Input
                  variant="builder"
                  label={item.value}
                  value={data[item.value]}
                  type="select"
                  options={
                    item.options == "functions"
                      ? Object.keys(functions).map(function (name) {
                          return { value: name, label: name };
                        })
                      : item.options
                  }
                  onChange={dataIn => {
                    let newData = { ...data };
                    newData[item.value] = dataIn == "true" ? true : false;
                    update(newData);
                  }}
                />
              </div>
            );
          }

          return (
            <div key={index} className="w-[300px] m-auto">
              <Input
                variant="builder"
                label={item.value}
                value={data[item.value]}
                onChange={dataIn => {
      

                  let newData = { ...data };
                  newData[item.value] = dataIn;
                  update(newData);
                }}
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div className="w-[200px]" />;
  }
}
