using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour {


    public GameObject[] Thrusters;
    public float rocket_force = 10;
    public float force_increment = 0.1f;
    public float min_force = 0;


    private Rigidbody rb;
    private Transform tr;
    public bool flying_mode,on_air,fast_state;
	// Use this for initialization
	void Start () {
        flying_mode = false;
        on_air = false;
        fast_state = false;
        tr = GetComponent<Transform>();
        rb = GetComponent<Rigidbody>();
	}
	
	// Update is called once per frame
	void Update () {

        if (!flying_mode)
        {
            if (Input.GetKey("a"))
            {
                rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, 2);
                tr.rotation = Quaternion.AngleAxis(-90, new Vector3(0, 1, 0));
            }
            if (Input.GetKey("d"))
            {
                rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, -2);
                tr.rotation = Quaternion.AngleAxis(90, new Vector3(0, 1, 0));
            }
            if (Input.GetKey("w"))
            {
                rb.velocity = new Vector3(2, rb.velocity.y, rb.velocity.z);
                tr.rotation = Quaternion.AngleAxis(0, new Vector3(0, 0, 0));
            }
            if (Input.GetKey("s"))
            {
                rb.velocity = new Vector3(-2, rb.velocity.y, rb.velocity.z);
                tr.rotation = Quaternion.AngleAxis(180, new Vector3(0, 1, 0));
            }
        }
        else
        {
            
            if (Input.GetKey("a"))
            {
                rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, 2);
                tr.rotation = Quaternion.AngleAxis(-90, new Vector3(0, 1, 0));
            }
            if (Input.GetKey("d"))
            {
                rb.velocity = new Vector3(rb.velocity.x, rb.velocity.y, -2);
                tr.rotation = Quaternion.AngleAxis(90, new Vector3(0, 1, 0));
            }
            if (Input.GetKey("w"))
            {
                
                rb.velocity = new Vector3(2, rb.velocity.y, rb.velocity.z);
                tr.rotation = Quaternion.AngleAxis(0, new Vector3(0, 0, 0));
            }
            if (Input.GetKey("s"))
            {
                rb.velocity = new Vector3(-2, rb.velocity.y, rb.velocity.z);
                tr.rotation = Quaternion.AngleAxis(180, new Vector3(0, 1, 0));
            }
            
        }

        if (Input.GetKeyDown(KeyCode.Space))
        {
            flying_mode = !flying_mode;
        }
        

    }

    

    //on the air
    private void OnCollisionExit(Collision collision)
    {
        on_air = true;
    }
    //touch ground
    private void OnCollisionEnter(Collision collision)
    {
        
        on_air = false;
    }
}
