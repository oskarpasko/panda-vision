from pymongo import MongoClient
from plot_2d import plot_2d

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['panda-vision']

# Aggregation with 'join', filtering, and selecting only the required fields
pipeline = [
    {
        "$lookup": {
            "from": "users",                  
            "localField": "user",              
            "foreignField": "login",          
            "as": "user_info"                 
        }
    },
    {
        "$unwind": "$user_info"                
    },
    {
        "$match": {
            "user_info.status": "zdiagnozowany",       
            "user_info.condition": "brak schorzenia"   
        }
    },
    {
        "$project": {
            "_id": 0,                        
            "time_of_test": 1,                
            "error_colors": 1,                 
            "sex": "$user_info.gender"        
        }
    }
]

# Execute the query
data = list(db.ishihara_test_results.aggregate(pipeline))

# Transform the result into a list of tuples (if required by plot_2d)
prepared_data = [(d["time_of_test"], d["error_colors"], d["sex"]) for d in data]

# Plot the chart
plot_2d(prepared_data, 'Color Test Results Plot')
