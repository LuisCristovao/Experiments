using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyMovement : MonoBehaviour {
    public float speed = 3;
    Rigidbody2D rb;
    Transform tr;
    GameObject vision;

    // Use this for initialization
    void Start () {
        vision = GetComponent<Transform>().GetChild(2).gameObject;
        rb = GetComponent<Rigidbody2D>();
        tr = GetComponent<Transform>();
        
    }
	
	// Update is called once per frame
	void Update () {
        rb.velocity = new Vector2(0, 0);
        rb.angularVelocity = 0;
        vision.GetComponent<Collider2D>();

       
    }

   
    void Brian()
    {

    }





}
