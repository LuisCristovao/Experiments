using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;



//abstract class LevelObjects
//{
//    public int id;
//    public string name;
//    public GameObject obj;



//    public LevelObjects(int _id, string _name, GameObject _obj)
//    {
//        id = _id;
//        name = _name;
//        obj = _obj;
//    }



//    abstract public void Create();

//    abstract public void Delete(int new_id, string new_name);

    
//}

//class Air : LevelObjects
//{
//    public Wall(int _id, string _name, GameObject _obj) : base(_id, _name, _obj)
//    {

//    }

//    public override void Create()
//    {
//        throw new System.NotImplementedException();
//    }

//    public override void Delete(int new_id, string new_name)
//    {
//        //GameObject.Destroy(obj);
//        id = new_id;
//        name = new_name;

//    }

//    public override bool Equals(object obj)
//    {
//        return base.Equals(obj);
//    }

//    public override int GetHashCode()
//    {
//        return base.GetHashCode();
//    }

//    public override string ToString()
//    {
//        return base.ToString();
//    }
//}

//class Relations
//{
//    //Store level objects id/name relations
//    Dictionary<string, int> name_id_relation = new Dictionary<string, int>();
//    Dictionary<int, string> id_name_relation = new Dictionary<int, string>();

//    public Relations()
//    {
//        this.name_id_relation = new Dictionary<string, int>()
//        {
//            { "Floor", 0 },
//            { "Block", 1 },
//        };
//        this.id_name_relation = new Dictionary<int, string>()
//        {
//            {0,"Floor" },
//            {1,"Block" },
//        };
//    }

//    public string getName(int id)
//    {
//        return id_name_relation[id];
//    }
//    public int getID(string name)
//    {
//        return name_id_relation[name];
//    }

//}






public class Create : MonoBehaviour {


    public GameObject block;
    public int size = 500;
    public float speed = 0.1f;
    public float zoom_speed=1;
    public GameObject[] platform_objects;



    private GameObject[,] matrix;
    Camera cam;
    Transform tr;
    int platform_object_index = 0;
	// Use this for initialization
	void Start () {
        tr = GetComponent<Transform>();
        cam = GetComponent<Camera>();
        matrix = new GameObject[size,size];
	}
	//void touchNumber(string num)
 //   {
 //       if (Input.GetKey(num))
 //       {
 //           platform_object_index = int.Parse(num);
 //       }
 //   }

    void SelectPlatformObj()
    {
        int[] numbers = new int[] { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
        Action<string> touchNumber=(string n) => {
            if (Input.GetKey(n))
            {
                platform_object_index = int.Parse(n);
            }
        };
        foreach(int n in numbers)
        {
            touchNumber(n.ToString());
        }    
    }
	// Update is called once per frame
	void Update () {
        Vector3 pz = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        pz.z = 0;
        //print(pz);
        float x, y;
        x = Mathf.Floor(pz.x + 0.25f);
        y = Mathf.Floor(pz.y + 0.25f);

        SelectPlatformObj();



        if (Input.GetMouseButton(0))
        {
            
            
            
            if (x>=0 && x<size && y >=0 && y < size && matrix[(int)x,(int)y]==null)
            {
                GameObject obj = Instantiate(platform_objects[platform_object_index]);
                obj.transform.position = new Vector2(x, y);
                print("click:" + obj.transform.position);
                matrix[(int)obj.transform.position.x, (int)obj.transform.position.y] = obj;
            }
            
        }
        

        if (Input.GetKey("e"))
        {
            if (x >= 0 && x < size && y >= 0 && y < size && matrix[(int)x, (int)y] != null)
            {
                Destroy(matrix[(int)x, (int)y]);
            }
        }
        if (Input.GetMouseButton(1))
        {
            cam.orthographicSize = cam.orthographicSize + Input.GetAxis("Mouse Y") * zoom_speed;
        }

        if (Input.GetKey("d"))
        {
            tr.Translate(new Vector3(speed, 0, 0));
        }
        if (Input.GetKey("a"))
        {
            tr.Translate(new Vector3(-speed, 0, 0));
        }
        if (Input.GetKey("w"))
        {
            tr.Translate(new Vector3(0, speed, 0));
        }
        if (Input.GetKey("s"))
        {
            tr.Translate(new Vector3(0, -speed, 0));
        }


    }
}
