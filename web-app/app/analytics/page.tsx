"use client";

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const mockTestData = [
    { name: 'Test 1', score: 75 },
    { name: 'Test 2', score: 88 },
    { name: 'Test 3', score: 92 },
    { name: 'Test 4', score: 64 },
    { name: 'Test 5', score: 78 },
];

const mockCategoryData = [
    { name: 'Matemática', value: 400 },
    { name: 'História', value: 300 },
    { name: 'Português', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsPage() {
    const router = useRouter();

    const handleExportData = () => {
        alert("Mock Export Data Functionality");
    };

    return (
        <div className="container py-8">
            <header className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">accelGrading</span>
                </Link>
                <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Test Scores Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Test Scores</CardTitle>
                        <CardDescription>Distribution of test scores across different tests</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={mockTestData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="score" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Category Distribution Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Category Distribution</CardTitle>
                        <CardDescription>Distribution of questions across different categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={mockCategoryData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                >
                                    {
                                        mockCategoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))
                                    }
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Statistics */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-2">Additional Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Questions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">500</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Average Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">79.4</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Most Popular Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">Matemática</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Buttons Below Graphs */}
            <div className="mt-8 flex justify-end gap-4">
                <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
                <Button variant="secondary" onClick={handleExportData}>Export Data</Button>
            </div>
        </div>
    );
}
