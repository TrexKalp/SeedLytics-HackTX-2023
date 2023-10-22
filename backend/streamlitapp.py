import requests
import streamlit as st
import pandas as pd
import plotly.express as px

FLASK_API_URL = "http://127.0.0.1:5000/search"

# Input for comma-separated company names or keywords
user_input = st.text_input("Enter comma-separated company names or keywords:")
queries = [query.strip() for query in user_input.split(",")]

# Select graph type and additional customization options
graph_type = st.selectbox("Choose a graph type:", ["Line", "Bar", "Scatter", "Box"])
x_axis = st.selectbox("Select X-axis data:", ["name", "category_list", "founded_at"])
y_axis = st.selectbox("Select Y-axis data:", ["funding_total_usd", "funding_rounds"])

all_data = []

# Fetch data for each company or keyword
for query in queries:
    response = requests.get(FLASK_API_URL, params={"q": query})
    data = response.json()
    if data:
        all_data.extend(data)

# Check if we have any data
if all_data:
    df = pd.DataFrame(all_data)

    # Plot graph based on user selection
    if graph_type == "Line":
        fig = px.line(
            df,
            x=x_axis,
            y=y_axis,
            title=f"Line Graph for Companies ({x_axis} vs {y_axis})",
            labels={x_axis: "X-axis", y_axis: "Y-axis"},
        )
    elif graph_type == "Bar":
        fig = px.bar(
            df,
            x=x_axis,
            y=y_axis,
            title=f"Bar Graph for Companies ({x_axis} vs {y_axis})",
            labels={x_axis: "X-axis", y_axis: "Y-axis"},
        )
    elif graph_type == "Scatter":
        fig = px.scatter(
            df,
            x=x_axis,
            y=y_axis,
            title=f"Scatter Plot for Companies ({x_axis} vs {y_axis})",
            labels={x_axis: "X-axis", y_axis: "Y-axis"},
        )

    elif graph_type == "Box":
        fig = px.box(
            df,
            x=x_axis,
            y=y_axis,
            title=f"Box Plot for Companies ({x_axis} vs {y_axis})",
            labels={x_axis: "X-axis", y_axis: "Y-axis"},
        )

    st.plotly_chart(fig)
else:
    st.write("No results found!")
