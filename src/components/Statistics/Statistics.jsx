// StatisticsPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { TrendingUp, Heart, Eye, RefreshCw, Zap, BarChart3, PieChart as PieChartIcon, Activity, Target, Star, Flame, Crown, Rocket, Trophy, Users, Sparkles, AlertCircle } from "lucide-react";

const StatisticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ allArts: 0, favourite: 0 });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeChart, setActiveChart] = useState("bar");
  const [lastUpdate, setLastUpdate] = useState("");

  const API_URL = "https://artify-server-iota.vercel.app/statistics";

  const fetchStatistics = async () => {
    try {
      setIsRefreshing(true);
      setError(null);

      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch statistics");

      const data = await res.json();
      setStats(data);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
    const interval = setInterval(fetchStatistics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-error/10 border border-error p-6 text-center">
        <AlertCircle className="mx-auto mb-4 text-error" size={48} />
        <p className="text-error">{error}</p>
        <button onClick={fetchStatistics} className="btn btn-error mt-4">
          Retry
        </button>
      </div>
    );
  }

  const regularArts = stats.allArts - stats.favourite;
  const favoritePercentage = stats.allArts > 0 ? ((stats.favourite / stats.allArts) * 100).toFixed(1) : 0;

  const chartData = [
    { name: "Total Arts", value: stats.allArts, color: "#3B82F6" },
    { name: "Favorites", value: stats.favourite, color: "#EC4899" },
    { name: "Regular", value: regularArts, color: "#10B981" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Statistics</h1>
          <p className="text-sm opacity-70">Last updated: {lastUpdate}</p>
        </div>
        <button onClick={fetchStatistics} disabled={isRefreshing} className="btn btn-primary">
          <RefreshCw className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Arts" value={stats.allArts} icon={<BarChart3 />} />
        <StatCard title="Favorites" value={stats.favourite} icon={<Heart />} />
        <StatCard title="Regular Arts" value={regularArts} icon={<Eye />} />
      </div>

      {/* CHART SELECTOR */}
      <div className="flex gap-3">
        {[
          { id: "bar", label: "Bar", icon: <BarChart3 /> },
          { id: "pie", label: "Pie", icon: <PieChartIcon /> },
          { id: "area", label: "Area", icon: <Activity /> },
        ].map((c) => (
          <button key={c.id} onClick={() => setActiveChart(c.id)} className={`btn ${activeChart === c.id ? "btn-primary" : "btn-outline"}`}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* CHART */}
      {stats.allArts > 0 && (
        <div style={{ width: "100%", height: 400 }}>
          <AnimatePresence mode="wait">
            {activeChart === "bar" && (
              <ResponsiveContainer>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value">
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {activeChart === "pie" && (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={120} label>
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            {activeChart === "area" && (
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

/* ---------- SMALL COMPONENT ---------- */
const StatCard = ({ title, value, icon }) => (
  <div className="card bg-base-100 shadow p-6">
    <div className="flex items-center gap-4">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default StatisticsPage;
