import { render, screen } from '@testing-library/react'
import { WeatherCard } from '@/components/WeatherCard'

const mockWeatherData = {
  city: '北京',
  temperature: 25,
  description: '晴天',
  humidity: 60,
  windSpeed: 3.5,
  icon: '01d'
}

describe('WeatherCard', () => {
  it('renders weather information correctly', () => {
    render(<WeatherCard weather={mockWeatherData} />)

    // 检查城市名称
    expect(screen.getByText('北京')).toBeInTheDocument()
    
    // 检查温度
    expect(screen.getByText('25°')).toBeInTheDocument()
    
    // 检查天气描述
    expect(screen.getByText('晴天')).toBeInTheDocument()
    
    // 检查湿度
    expect(screen.getByText('60%')).toBeInTheDocument()
    
    // 检查风速
    expect(screen.getByText('3.5m/s')).toBeInTheDocument()
    
    // 检查状态芯片
    expect(screen.getByText('实时')).toBeInTheDocument()
  })

  it('applies correct temperature-based color for hot weather', () => {
    const hotWeather = { ...mockWeatherData, temperature: 35 }
    render(<WeatherCard weather={hotWeather} />)
    
    const temperatureText = screen.getByText('35°')
    expect(temperatureText).toHaveStyle('color: #ff5722')
  })

  it('applies correct temperature-based color for cold weather', () => {
    const coldWeather = { ...mockWeatherData, temperature: 5 }
    render(<WeatherCard weather={coldWeather} />)
    
    const temperatureText = screen.getByText('5°')
    expect(temperatureText).toHaveStyle('color: #2196f3')
  })
})