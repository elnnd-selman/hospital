import {
  useGetDepartmentWithTestsQuery,
  useGetDepartmentsQuery,
} from "@/app/redux/apis/departmentApis";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Typography,
} from "@material-tailwind/react";

export function DepartmentTabs({
  handleSelectTest,
}: {
  handleSelectTest: any;
}) {
  const { data: Deps, isLoading: getDepsIsLoading } =
    useGetDepartmentWithTestsQuery("");

  return (
    <Card className=" w-full ">
      {getDepsIsLoading ? (
        "Loadding"
      ) : (
        <Tabs value="html">
          <TabsHeader>
            {Deps.data.map((dep: any) => (
              <Tab key={dep._id} value={dep._id}>
                {dep.name}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {Deps.data.map((dep: any) => (
              <TabPanel key={dep._id} value={dep._id}>
                <div className="w-full flex flex-wrap justify-start items-start ">
                  

                  {dep.tests.map((test: any) => {
                    return (
                      <label
                        htmlFor={test._id}
                        className="flex  cursor-pointer items-center px-3 py-2 rounded-lg m-2 "
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            onChange={() => {
                              handleSelectTest(dep, test);
                            }}
                            crossOrigin={""}
                            id={test._id}
                            ripple={false}
                            className="hover:before:opacity-0"
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography className="font-medium">
                          {test.name}
                        </Typography>
                      </label>
                    );
                  })}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      )}
    </Card>
  );
}
