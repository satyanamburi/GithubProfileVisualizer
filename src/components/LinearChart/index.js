import './index.css'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const LinearChart = props => {
  const {quarterCommitsCount} = props
  const data = quarterCommitsCount
  console.log(data)
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#3B82F6" strokeDasharray="3 3" />
        <XAxis stroke="#3B82F6" dataKey="name" />
        <YAxis stroke="#3B82F6" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="commits"
          stroke="#3B82F6"
          activeDot={{r: 8}}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default LinearChart
