'use client'

import React from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip
} from '@mui/material'
import {
  WbSunny,
  Cloud,
  Grain,
  Air,
  Opacity
} from '@mui/icons-material'

interface Weather {
  city: string
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  icon: string
}

interface WeatherCardProps {
  weather: Weather
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const getWeatherIcon = (icon: string) => {
    // 简化的图标映射
    if (icon.includes('01')) return <WbSunny sx={{ fontSize: 40 }} />
    if (icon.includes('02') || icon.includes('03') || icon.includes('04')) return <Cloud sx={{ fontSize: 40 }} />
    return <Grain sx={{ fontSize: 40 }} />
  }
  
  const getTemperatureColor = (temp: number) => {
    if (temp >= 30) return '#ff5722' // 红色 - 热
    if (temp >= 20) return '#ff9800' // 橙色 - 温暖
    if (temp >= 10) return '#4caf50' // 绿色 - 凉爽
    return '#2196f3' // 蓝色 - 冷
  }
  
  return (
    <Card 
      sx={{ 
        mt: 1,
        background: `linear-gradient(135deg, ${getTemperatureColor(weather.temperature)}22 0%, ${getTemperatureColor(weather.temperature)}11 100%)`,
        border: `1px solid ${getTemperatureColor(weather.temperature)}33`
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* 主要信息 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: getTemperatureColor(weather.temperature) }}>
              {weather.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {weather.description}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: getTemperatureColor(weather.temperature) }}>
              {getWeatherIcon(weather.icon)}
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: getTemperatureColor(weather.temperature)
              }}
            >
              {weather.temperature}°
            </Typography>
          </Box>
        </Box>
        
        {/* 详细信息 */}
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Opacity sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  湿度
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {weather.humidity}%
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Air sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">
                  风速
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {weather.windSpeed}m/s
                </Typography>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary" display="block">
                状态
              </Typography>
              <Chip 
                label="实时" 
                size="small" 
                color="success" 
                variant="outlined"
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}