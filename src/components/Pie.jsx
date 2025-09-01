import { ResponsivePie } from '@nivo/pie'

const MyPie = ({ data /* see data tab */ }) => (
    <ResponsivePie /* or Pie for fixed dimensions */
        data={data}
        margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
        innerRadius={0.5}
        padAngle={0.6}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'purpleRed_green' }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                symbolShape: 'circle'
            }
        ]}
    />
)

export default MyPie;