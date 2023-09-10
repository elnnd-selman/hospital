import { useCreateSubTestMutation } from "@/app/redux/apis/subTestApis";
import {
  Button,
  Card,
  IconButton,
  Input,
  ListItem,
  ListItemSuffix,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { List } from "@mui/material";
import { useState } from "react";

interface TestType {
  name: string;
  parentId: string;
  type: string;
  user: string;
  data: any;
}
export function Create() {
  const [createTest, { isLoading }] = useCreateSubTestMutation();

  const [form, setFormData] = useState<TestType>({
    name: "",
    parentId: "",
    type: "",
    user: "",
    data: null,
  });

  const [keyInput, setKeyInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...form,
      [name]: value,
    });
  };
  const setDataToNull = () => {
    setFormData((prevState) => ({
      ...prevState,
      data: null,
    }));
  };
  const addSelectValueToType = () => {
    if (form.data == null) {
      handleChange({
        target: {
          name: "data",
          value: [keyInput],
        },
      });
    } else {
      handleChange({
        target: {
          name: "data",
          value: [...form.data, keyInput],
        },
      });
    }
  };

  const addKeyAndValueToType = () => {
    if (form.data == null) {
      handleChange({
        target: {
          name: "data",
          value: [{ key: keyInput, value: valueInput }],
        },
      });
    } else {
      handleChange({
        target: {
          name: "data",
          value: [...form.data, { key: keyInput, value: valueInput }],
        },
      });
    }
  };

  //RETURN
  return (
    <Card color="transparent" shadow={false} className="flex  items-center">
      <Typography variant="h4" color="blue-gray">
        Add Sub test
      </Typography>

      <div className="mt-8  w-[calc(100%/2)] ">
        
        <Input
          size="lg"
          label="Name"
          crossOrigin={""}
          name="name"
          value={form.name}
          onChange={(e) => handleChange(e)}
          className=" mb-4"
        />
        <div className="my-5"></div>
        <Select
          label="Select Type"
          onChange={(value) => {
            setKeyInput("");
            setValueInput("");
            setDataToNull();
            console.log(form.data);

            handleChange({
              target: {
                name: "type",
                value,
              },
            });
          }}
        >
          <Option value="normalRange">Normal Range</Option>
          <Option value="text">Text</Option>
          <Option value="keyAndValue">Key and Value</Option>
          <Option value="select">Select</Option>
          <Option value="Parent">Parent</Option>
        </Select>
        <div className="my-5"></div>

        {form.type == "normalRange" && (
          <>
            <Input
              size="lg"
              label="Normal Range"
              crossOrigin={""}
              name="data"
              value={form.data}
              onChange={(e) => handleChange(e)}
            />
          </>
        )}

        {/* IF SELECT */}
        {form.type == "select" && (
          <>
            {form.data != null && (
              <Card className="w-96">
                <List>
                  {form.data.map((e: string, index: number) => {
                    return (
                      <ListItem ripple={false} className="py-1 pr-1 pl-4">
                        {e.toString()}
                        <ListItemSuffix>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => {
                              setFormData((prevState) => {
                                // Create a copy of the data array without the item to remove
                                const updatedData = prevState.data.filter(
                                  (_: any, i: number) => i !== index
                                );

                                // Return a new state object with the updated data array
                                return { ...prevState, data: updatedData };
                              });
                            }}
                          >
                            <TrashIcon />
                          </IconButton>
                        </ListItemSuffix>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            )}
            <div className="my-5"></div>
            <div className="flex justify-center items-center">
              <Input
                size="lg"
                label="Select value"
                crossOrigin={""}
                name="select value"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <Button onClick={addSelectValueToType}>Add </Button>
            </div>{" "}
          </>
        )}

        {/* IF KEY AND VALUE */}
        {form.type == "keyAndValue" && (
          <>
            {form.data != null && (
              <Card className="w-96">
                <List>
                  {form.data.map((e: any, index: number) => {
                    return (
                      <ListItem ripple={false} className="py-1 pr-1 pl-4">
                        {e.key}: {e.value}
                        <ListItemSuffix>
                          <IconButton
                            variant="text"
                            color="blue-gray"
                            onClick={() => {
                              setFormData((prevState) => {
                                // Create a copy of the data array without the item to remove
                                const updatedData = prevState.data.filter(
                                  (_: any, i: number) => i !== index
                                );

                                // Return a new state object with the updated data array
                                return { ...prevState, data: updatedData };
                              });
                            }}
                          >
                            <TrashIcon />
                          </IconButton>
                        </ListItemSuffix>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            )}{" "}
            <div className="my-5"></div>
            <div className="flex justify-center items-center">
              <Input
                size="lg"
                label="Key"
                crossOrigin={""}
                name="Key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
              />
              <Input
                size="lg"
                label="Value"
                crossOrigin={""}
                name="Value"
                value={valueInput}
                onChange={(e) => setValueInput(e.target.value)}
              />
              <Button onClick={addKeyAndValueToType}>Add </Button>
            </div>{" "}
          </>
        )}

        <Button
          disabled={isLoading}
          className="mt-6"
          fullWidth
          onClick={() => {
            console.log(form);

            createTest(form);
          }}
        >
          {isLoading ? "Creating..." : "Create"}
        </Button>
      </div>
    </Card>
  );
}

function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
