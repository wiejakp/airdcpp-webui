import React from 'react';

import { Charts, ChartContainer, ChartRow, YAxis, AreaChart, styler } from 'react-timeseries-charts';
import SetContainerSize from 'mixins/SetContainerSize';
import PureRenderMixin from 'react-addons-pure-render-mixin';


const upDownStyler = styler([
	{ 
		key: 'in',
		color: '#C8D5B8',
	}, {
		key: 'out', 
		color: 'lightcoral',
	}
]);

const SpeedChart = React.createClass({
	mixins: [ SetContainerSize, PureRenderMixin ],
	render() {
		const { trafficSeries, maxDownload, maxUpload } = this.props;
		return (
			<div className="graph">
				<ChartContainer 
					timeRange={ trafficSeries.timerange() } 
					width={ this.state.width }
				>
					<ChartRow 
						height={ this.state.height - 25 }
					>
						<Charts>
							<AreaChart
								axis="traffic"
								series={ trafficSeries }
								columns={{ up: [ 'in' ], down: [ 'out' ] }}
								style={ upDownStyler }
							/>
						</Charts>
						<YAxis
							id="traffic"
							label="Traffic (bps)"
							min={ -maxUpload } max={ maxDownload }
							absolute={true}
							width="60"
							type="linear"
						/>
					</ChartRow>
				</ChartContainer>
			</div>
		);
	}
});

export default SpeedChart;