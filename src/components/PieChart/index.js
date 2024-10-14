import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const colors = [
  '#54CA76',
  '#31A4E6',
  '#F5C452',
  '#F2637F',
  '#7FFFD4',
  '#00ff00',
  '#9261F3',
  '#6A0DAD',
  '#ff0000',
  '#0000ff',
  '#FFCE44',
]

const Piechart = props => {
  const {languages} = props
  const data = languages

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={data.name + data.value} fill={colors[index]} />
          ))}
        </Pie>
        <Legend
          iconType="square"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
export default Piechart
