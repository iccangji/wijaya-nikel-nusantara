import { Bar } from 'react-chartjs-2';
import { usePage } from '@inertiajs/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { useState } from 'react';

export default function chartCard() {
    const { chartData } = usePage().props;
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];


    const [year, setYear] = useState(new Date().getFullYear());
    const yearList = [...new Set(chartData.map((item: { tahun: number; }) => item.tahun))];
    const dataYear = chartData.filter((item: { tahun: number; }) => item.tahun === year);

    // Buat array 12 bulan default 0
    const dataChart = Array(12).fill(0);
    dataYear.forEach((item: { bulan: number; total: number; }) => {
        dataChart[item.bulan - 1] = item.total;
    });

    const data = {
        labels: monthLabels,
        datasets: [
            {
                data: dataChart,
                backgroundColor: '#fb923c',
            }
        ]
    };

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };


    return (
        <Card className="w-full rounded-2xl">
            <CardHeader>
                <CardTitle className="mt-2">
                    <p>Hasil Muatan</p>
                </CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <label className="font-semibold mr-2">Pilih Tahun:</label>
                    <select
                        value={year}
                        onChange={(e) => setYear(parseInt(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {(yearList as (number)[]).map((t) => (
                            <option key={String(t)} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <Bar data={data} options={options} />;
            </CardContent>
            <CardFooter></CardFooter>
        </Card>
    )
}
