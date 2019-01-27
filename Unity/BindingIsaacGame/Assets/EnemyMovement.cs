using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyMovement : MonoBehaviour {
    public float speed = 3;
    Rigidbody2D rb;
    Transform tr;
   
    // Use this for initialization
    void Start () {
        rb = GetComponent<Rigidbody2D>();
        tr = GetComponent<Transform>();
        
    }
	
	// Update is called once per frame
	void Update () {
        rb.velocity = new Vector2(0, 0);
        rb.angularVelocity = 0;


       
    }


    void Brian()
    {

    }





}
