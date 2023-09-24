import { useCreateDepartmentMutation } from "@/app/redux/apis/departmentApis";
import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogFooter,
    Input,
    Typography
} from "@material-tailwind/react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import moment from "moment";
import { useState } from "react";

export function PdfDialog({
    open,
    handleOpen,
    data
}: {
    open: boolean;
    handleOpen: any;
    data: any
}) {

    const [name, setName] = useState("");
    const [createDepartment, { isLoading }] = useCreateDepartmentMutation();
    return (
        <>
            <Dialog open={open} handler={() => {
                handleOpen(!open)
            }} >
                <DialogBody divider className="grid place-items-center gap-4  ">
                    <PDFViewer width="100%" height="600">
                        <MyDocument data={data} />
                    </PDFViewer>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={() => {
                        handleOpen(false)
                    }}>
                        close
                    </Button>
                    <Button variant="gradient" onClick={() => {

                    }}>
                        {isLoading ? 'Creating' : 'Create'}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}



const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    patientInformation: {
        flexDirection: "row",
        justifyContent: "space-between", // if you want it to be row-direction
        flexWrap: "nowrap",
        border: '1px solid black',
        margin: 10,
        padding: 10,
        borderRadius: 10
    },

    departmentName: {
        marginTop: 20,

        fontSize: 20,
        marginBottom: 10,
        textAlign: "center",
        width: '100%'


    },
    patientInformationData: {
        fontSize: 14,
        marginLeft: 5

    },
    header: {
        fontSize: 20,
        marginBottom: 10,
    },
    headerTest: {
        textAlign: "center",
        marginTop: 10,

        fontSize: 16,
        marginBottom: 10,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor:"grey",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderRadius: 2
    },
    tableData: {
        display: "table",
        width: "auto",

    },
    keyAndValue: {
        width: "100%",
    },
    tableRow: {
        width: '100%',
        margin: "auto",
        flexDirection: "row",
    },
    tableRowData: {
        width: '100%',
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: '100%',
        borderStyle: "solid",
        borderColor:"grey",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,


    },
    tableColTest: {
        width: '50%',
        borderStyle: "solid",
        borderColor:"grey",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 2

    },
    tableColResult: {
        width: '70%',
        borderStyle: "solid",
        borderColor:"grey",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 2

    },
    tableColData: {
        width: '100%',

        borderWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,


    },

    tableCell: {
        width: '100%',
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        padding: 2
    },
    footer: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey'
    }
});

const MyDocument = ({ data }: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* PATIENT INFO */}
            <View style={styles.patientInformation}>
                <Text style={styles.patientInformationData}>Name: {data.name}</Text>
                <Text style={styles.patientInformationData}>Code: {data.code}</Text>
                <Text style={styles.patientInformationData}>Phone: {data.phone}</Text>
                <Text style={styles.patientInformationData}>Gender: {data.gender}</Text>
            </View>

            {data.doneTest.map((dept: any) => (
                <View key={dept._id} >
                    <Text style={styles.departmentName}>{dept.name}</Text>
                    <View style={styles.table}>
                        {/* HEADER ROW TABLE */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableColTest}>
                                <Text style={styles.tableCell}>TEST</Text>
                            </View>
                            <View style={styles.tableColResult}>
                                <Text style={styles.tableCell}>RESULT</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>NORMAL RANGE</Text>
                            </View>
                        </View>;
                        {dept.tests.map((test: any) => {
                            if (test.subTests.length < 1) {
                                return <View key={test._id} style={styles.tableRow}>
                                    <View style={styles.tableColTest}>
                                        <Text style={styles.tableCell}>{test.name}</Text>
                                    </View>
                                    <View style={styles.tableColResult}>
                                        <Text style={styles.tableCell}>{test.result}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        {
                                            test.type == 'keyAndValue' ? returnNormalRange(test.data, test.type) :
                                                <Text style={styles.tableCell}>{returnNormalRange(test.data, test.type)}</Text>
                                        }
                                    </View>


                                </View>;
                            }

                        })}
                        {dept.tests.filter((t: any) => t.subTests && t.subTests.length > 0).map((test: any) => (
                            <View key={test._id}>

                                <Text style={styles.headerTest}>{test.name}</Text>
                                {test.subTests.map((subTest: any) => (<>

                                    <View key={subTest._id} style={styles.tableRow}>
                                        <View style={styles.tableColTest}>
                                            <Text style={styles.tableCell}>{subTest.name}</Text>
                                        </View>
                                        <View style={styles.tableColResult}>
                                            <Text style={styles.tableCell}>{subTest.result}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            {
                                                subTest.type == 'keyAndValue' ? returnNormalRange(subTest.data, subTest.type) :
                                                    <Text style={styles.tableCell}>{returnNormalRange(subTest.data, subTest.type)}</Text>
                                            }
                                        </View>
                                    </View></>
                                ))}
                            </View>
                        ))}
                    </View>
                </View>
            ))}
            <Text style={
                { marginTop: 10, fontSize:12 }
            }>
                {moment().format("YYYY-MM-DD HH:mm")}
            </Text>
        </Page>
    </Document>
);


const returnNormalRange = (data: any, type: any) => {
    if (data == null || type == 'text') {
        return ''
    }
    if (data != null && type == 'select') {
        return ''
    }
    if (data != null && type == 'normalRange') {
        return data
    }

    if (data != null && type == 'keyAndValue') {
        return <View style={styles.tableData}>
            {/* HEADER ROW TABLE */}
            {data.map((e: any) => {
                return <View style={styles.tableRowData}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{e.key}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{e.value}</Text>
                    </View>

                </View>;
            })
            }

        </View>
    }
    return ''

}




