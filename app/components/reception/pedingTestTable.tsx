import { Card, List, ListItem} from "@material-tailwind/react";



export function PendingTestTable({ pendingTest }: { pendingTest: any }) {
  return (
    <>
      {" "}
      <div className="flex">
        {pendingTest.map((dep: any) => {
          return (
            <Card className="p-5">
              <div> {dep.name}</div>

              <List>
                {dep.tests.map((test: any) => {
                  return (
                    <ListItem ripple={false} className="py-1 pr-1 pl-4">
                      {test.name}
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          );
        })}
      </div>
    </>
  );
}
