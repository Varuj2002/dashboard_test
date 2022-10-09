import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

const exhort = () => {
  console.log("exhort", 'exhort');
}

const confirm = () => {
  console.log("Confirm", 'Confirm');
}

const cancel = () => {
  console.log("Cancel", 'Cancel');
}

export default function TableBreak() {
  return (
    <>
    <div style={{ position: 'absolute', top: "10%", right: '15%'}}>
      <button onClick={exhort} style={{borderWidth: 0.1, backgroundColor: 'green', borderRadius: 0, color: 'white', marginRight: 15}}>
        Exhort
      </button>
      <button onClick={confirm} style={{borderWidth: 0.1, backgroundColor: '#F7A91C', borderRadius: 0, color: 'white', marginRight: 15}}>
        Confirm
      </button>
      <button onClick={cancel} style={{borderWidth: 0.1, backgroundColor: 'red', borderRadius: 0, color: 'white'}}>
        Cancel
      </button>
    </div>
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      // highlightOnHover
      // provide data
      records={[
        {
          name: 'John Johnich',
          status: 'Coffee Break',
          time: 25,
        },
        {
          name: 'Sara Saravna',
          status: 'Waiting',
          time: 24,
        },
        // more records...
      ]}
      // define columns
      columns={[
        {
          accessor: 'name',
          // this column has a custom title
          // title: '#',
          // right-align column
          color: 'blue'
          // textAlignment: 'center',
        },
        // { accessor: 'name' },
        {
          accessor: 'status',
          // this column has custom cell data rendering
          render: ({ status }) => (
            <Text weight={700} style={ status === 'Waiting' ?{backgroundColor: '#888C6B', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 } : {backgroundColor: 'green', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }} color={'white'}>
              {status}
            </Text>
          ),
        },
        { accessor: 'time',
        render: ({ time }) => (
          <Text weight={700} color={time >= 25 ? 'red' : 'green'}>
            {time} minute
          </Text>
        ),
      },
      ]}
      // execute this callback when a row is clicked
      // onRowClick={({ name, time }) =>
      //   alert(`You clicked on ${name}, president born in ${time}.`)
      // }
    />
    </>
  );
}